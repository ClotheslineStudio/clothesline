import type { PrismaClient } from '$lib/generated/prisma/client';
import { Prisma } from '$lib/generated/prisma/client';

import type { AppError } from '$lib/validation/appError';
import { notFoundError, validationError } from '$lib/validation/appError';
import { CreateTaskSchema, UpdateTaskSchema, zodFieldErrors } from '$lib/validation/tasks';

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; error: AppError };
type Result<T> = Ok<T> | Err;

async function validateProjectInWorkspace(
	prisma: PrismaClient,
	workspaceId: string,
	projectId: string
): Promise<AppError | null> {
	const project = await prisma.project.findFirst({
		where: { id: projectId, workspaceId },
		select: { id: true }
	});

	if (!project) {
		return validationError('Please fix the highlighted fields.', {
			projectId: 'Project not found in this workspace'
		});
	}

	return null;
}

export async function createTask(
	prisma: PrismaClient,
	workspaceId: string,
	input: unknown
): Promise<Result<{ id: string }>> {
	const parsed = CreateTaskSchema.safeParse(input);
	if (!parsed.success) {
		return {
			ok: false,
			error: validationError('Please fix the highlighted fields.', zodFieldErrors(parsed.error))
		};
	}

	if (parsed.data.projectId) {
		const projectError = await validateProjectInWorkspace(prisma, workspaceId, parsed.data.projectId);
		if (projectError) return { ok: false, error: projectError };
	}

	try {
		const created = await prisma.task.create({
			data: {
				workspaceId,
				title: parsed.data.title,
				body: parsed.data.description,
				status: parsed.data.status,
				priority: parsed.data.priority,
				dueDate: parsed.data.dueDate,
				assigneeId: parsed.data.assigneeId,
				projectId: parsed.data.projectId
			},
			select: { id: true }
		});

		return { ok: true, data: created };
	} catch (error) {
		console.error('[createTask] failed to create task', error);
		return {
			ok: false,
			error: validationError('Unable to create task. Please try again.')
		};
	}
}

export async function updateTask(
	prisma: PrismaClient,
	workspaceId: string,
	id: string,
	patch: unknown
): Promise<Result<{ id: string }>> {
	const parsed = UpdateTaskSchema.safeParse({ ...(patch as Record<string, unknown>), id });
	if (!parsed.success) {
		return {
			ok: false,
			error: validationError('Please fix the highlighted fields.', zodFieldErrors(parsed.error))
		};
	}

	if (parsed.data.projectId !== undefined && parsed.data.projectId !== null) {
		const projectError = await validateProjectInWorkspace(prisma, workspaceId, parsed.data.projectId);
		if (projectError) return { ok: false, error: projectError };
	}

	const data: Prisma.TaskUncheckedUpdateManyInput = {};
	if (parsed.data.title !== undefined) data.title = parsed.data.title;
	if (parsed.data.description !== undefined) data.body = parsed.data.description;
	if (parsed.data.status !== undefined) data.status = parsed.data.status;
	if (parsed.data.priority !== undefined) data.priority = parsed.data.priority;
	if (parsed.data.dueDate !== undefined) data.dueDate = parsed.data.dueDate;
	if (parsed.data.assigneeId !== undefined) data.assigneeId = parsed.data.assigneeId;
	if (parsed.data.projectId !== undefined) data.projectId = parsed.data.projectId;

	if (Object.keys(data).length === 0) {
		return {
			ok: false,
			error: validationError('Please fix the highlighted fields.', {
				form: 'No fields provided to update.'
			})
		};
	}

	try {
		const result = await prisma.task.updateMany({
			where: { id: parsed.data.id, workspaceId, archivedAt: null },
			data
		});

		if (result.count === 0) {
			return { ok: false, error: notFoundError('Task not found (or archived).') };
		}
	} catch (error) {
		console.error('[updateTask] failed to update task', error);
		return {
			ok: false,
			error: validationError('Unable to save changes. Please try again.')
		};
	}

	return { ok: true, data: { id: parsed.data.id } };
}

export async function archiveTask(
	prisma: PrismaClient,
	workspaceId: string,
	id: string
): Promise<Result<{ id: string }>> {
	if (!id) {
		return {
			ok: false,
			error: validationError('Please fix the highlighted fields.', { id: 'Missing task id' })
		};
	}

	const result = await prisma.task.updateMany({
		where: { id, workspaceId, archivedAt: null },
		data: { archivedAt: new Date() }
	});

	if (result.count === 0) {
		return { ok: false, error: notFoundError('Task not found (or already archived).') };
	}

	return { ok: true, data: { id } };
}

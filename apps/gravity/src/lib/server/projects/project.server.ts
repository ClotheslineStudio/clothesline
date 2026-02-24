import type { PrismaClient } from '$lib/generated/prisma/client';
import { Prisma } from '$lib/generated/prisma/client';

import type { AppError } from '$lib/validation/appError';
import { notFoundError, validationError } from '$lib/validation/appError';
import { CreateProjectSchema, UpdateProjectSchema, zodFieldErrors } from '$lib/validation/projects';

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; error: AppError };
type Result<T> = Ok<T> | Err;

export async function createProject(
	prisma: PrismaClient,
	workspaceId: string,
	input: unknown
): Promise<Result<{ id: string }>> {
	const parsed = CreateProjectSchema.safeParse(input);
	if (!parsed.success) {
		return {
			ok: false,
			error: validationError('Please fix the highlighted fields.', zodFieldErrors(parsed.error))
		};
	}

	try {
		const created = await prisma.project.create({
			data: {
				workspaceId,
				title: parsed.data.title,
				description: parsed.data.description,
				status: parsed.data.status,
				startDate: parsed.data.startDate,
				dueDate: parsed.data.dueDate
			},
			select: { id: true }
		});

		return { ok: true, data: created };
	} catch (error) {
		console.error('[createProject] failed to create project', error);
		return { ok: false, error: validationError('Unable to create project. Please try again.') };
	}
}

export async function updateProject(
	prisma: PrismaClient,
	workspaceId: string,
	id: string,
	patch: unknown
): Promise<Result<{ id: string }>> {
	const parsed = UpdateProjectSchema.safeParse({ ...(patch as Record<string, unknown>), id });
	if (!parsed.success) {
		return {
			ok: false,
			error: validationError('Please fix the highlighted fields.', zodFieldErrors(parsed.error))
		};
	}

	const data: Prisma.ProjectUncheckedUpdateManyInput = {};
	if (parsed.data.title !== undefined) data.title = parsed.data.title;
	if (parsed.data.description !== undefined) data.description = parsed.data.description;
	if (parsed.data.status !== undefined) data.status = parsed.data.status;
	if (parsed.data.startDate !== undefined) data.startDate = parsed.data.startDate;
	if (parsed.data.dueDate !== undefined) data.dueDate = parsed.data.dueDate;

	if (Object.keys(data).length === 0) {
		return {
			ok: false,
			error: validationError('Please fix the highlighted fields.', {
				form: 'No fields provided to update.'
			})
		};
	}

	try {
		const result = await prisma.project.updateMany({
			where: { id: parsed.data.id, workspaceId, archivedAt: null },
			data
		});

		if (result.count === 0) {
			return { ok: false, error: notFoundError('Project not found (or archived).') };
		}
	} catch (error) {
		console.error('[updateProject] failed to update project', error);
		return { ok: false, error: validationError('Unable to save changes. Please try again.') };
	}

	return { ok: true, data: { id: parsed.data.id } };
}

export async function archiveProject(
	prisma: PrismaClient,
	workspaceId: string,
	id: string
): Promise<Result<{ id: string }>> {
	if (!id) {
		return {
			ok: false,
			error: validationError('Please fix the highlighted fields.', { id: 'Missing project id' })
		};
	}

	const result = await prisma.project.updateMany({
		where: { id, workspaceId, archivedAt: null },
		data: { archivedAt: new Date() }
	});

	if (result.count === 0) {
		return { ok: false, error: notFoundError('Project not found (or already archived).') };
	}

	return { ok: true, data: { id } };
}

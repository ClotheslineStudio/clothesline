import type { PrismaClient } from '$lib/generated/prisma/client';

import type { AppError } from '$lib/validation/appError';
import { notFoundError, validationError } from '$lib/validation/appError';

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; error: AppError };
type Result<T> = Ok<T> | Err;

export type ProjectTaskSummary = {
	id: string;
	title: string;
	status: string;
	priority: string;
	dueDate: Date | null;
	assignee: string | null;
};

export type ProjectDetail = {
	project: {
		id: string;
		workspaceId: string;
		title: string;
		description: string | null;
		status: string;
		startDate: Date | null;
		dueDate: Date | null;
		archivedAt: Date | null;
		createdAt: Date;
		updatedAt: Date;
	};
	tasks: ProjectTaskSummary[];
};

export async function getProjectDetail(
	prisma: PrismaClient,
	workspaceId: string,
	projectId: string,
	opts: { includeArchivedTasks?: boolean } = {}
): Promise<Result<ProjectDetail>> {
	if (!projectId) {
		return {
			ok: false,
			error: validationError('Invalid request', { projectId: 'projectId is required' })
		};
	}

	const includeArchivedTasks = opts.includeArchivedTasks ?? false;

	const taskWhere = includeArchivedTasks ? {} : { where: { archivedAt: null } };

	const project = await prisma.project.findFirst({
		where: { id: projectId, workspaceId },
		select: {
			id: true,
			workspaceId: true,
			title: true,
			description: true,
			status: true,
			startDate: true,
			dueDate: true,
			archivedAt: true,
			createdAt: true,
			updatedAt: true,
			tasks: {
				...taskWhere,
				select: {
					id: true,
					title: true,
					status: true,
					priority: true,
					dueDate: true,
					assigneeId: true
				},
				orderBy: { updatedAt: 'desc' }
			}
		}
	});

	if (!project) {
		return { ok: false, error: notFoundError('Project not found') };
	}

	return {
		ok: true,
		data: {
			project: {
				id: project.id,
				workspaceId: project.workspaceId,
				title: project.title,
				description: project.description ?? null,
				status: project.status,
				startDate: project.startDate ?? null,
				dueDate: project.dueDate ?? null,
				archivedAt: project.archivedAt ?? null,
				createdAt: project.createdAt,
				updatedAt: project.updatedAt
			},
			tasks: project.tasks.map((task) => ({
				id: task.id,
				title: task.title,
				status: task.status,
				priority: task.priority,
				dueDate: task.dueDate ?? null,
				assignee: task.assigneeId ?? null
			}))
		}
	};
}

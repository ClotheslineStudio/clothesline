import type { PrismaClient } from '$lib/generated/prisma/client';

import type { AppError } from '$lib/validation/appError';
import { notFoundError, validationError } from '$lib/validation/appError';

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; error: AppError };
type Result<T> = Ok<T> | Err;

export type RequirementSummary = {
	id: string;
	title: string;
	status: string;
	priority: string;
};

type TaskDetailTask = {
	id: string;
	workspaceId: string;
	title: string;
	status: string;
	priority: string;
	dueDate: Date | null;
	assigneeId: string | null;
	archivedAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
};

export type TaskDetailData = {
	task: TaskDetailTask;
	implementsRequirements: RequirementSummary[];
};

export async function getTaskDetail(
	prisma: PrismaClient,
	workspaceId: string,
	taskId: string,
	opts?: { includeArchivedRequirements?: boolean }
): Promise<Result<TaskDetailData>> {
	if (!taskId) {
		return { ok: false, error: validationError('Validation failed.', { taskId: 'Missing task id' }) };
	}

	const task = await prisma.task.findFirst({
		where: { id: taskId, workspaceId },
		select: {
			id: true,
			workspaceId: true,
			title: true,
			status: true,
			priority: true,
			dueDate: true,
			assigneeId: true,
			archivedAt: true,
			createdAt: true,
			updatedAt: true
		}
	});

	if (!task) return { ok: false, error: notFoundError('Task not found') };

	const edges = await prisma.edge.findMany({
		where: {
			workspaceId,
			type: 'IMPLEMENTS',
			fromType: 'TASK',
			fromId: taskId,
			toType: 'REQUIREMENT'
		},
		select: { toId: true }
	});

	const requirementIds = Array.from(new Set(edges.map((edge) => edge.toId)));
	if (!requirementIds.length) {
		return { ok: true, data: { task, implementsRequirements: [] } };
	}

	const requirements = await prisma.requirement.findMany({
		where: {
			workspaceId,
			id: { in: requirementIds },
			...(opts?.includeArchivedRequirements ? {} : { archivedAt: null })
		},
		select: {
			id: true,
			title: true,
			status: true,
			priority: true
		}
	});

	const byId = new Map(requirements.map((req) => [req.id, req]));
	const ordered = requirementIds.map((id) => byId.get(id)).filter(Boolean) as RequirementSummary[];

	return { ok: true, data: { task, implementsRequirements: ordered } };
}

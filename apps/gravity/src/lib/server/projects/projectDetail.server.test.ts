import { describe, expect, it, vi } from 'vitest';

import type { PrismaClient } from '$lib/generated/prisma/client';
import { getProjectDetail } from '$lib/server/projects/projectDetail.server';

function makePrismaMock(findFirst = vi.fn()) {
	return {
		project: {
			findFirst
		}
	} as unknown as PrismaClient;
}

describe('getProjectDetail', () => {
	it('scopes project query by workspace id and project id', async () => {
		const findFirst = vi.fn().mockResolvedValue({
			id: 'p1',
			workspaceId: 'ws_a',
			title: 'Project A',
			description: null,
			status: 'ACTIVE',
			startDate: null,
			dueDate: null,
			archivedAt: null,
			createdAt: new Date('2026-01-01T00:00:00.000Z'),
			updatedAt: new Date('2026-01-02T00:00:00.000Z'),
			tasks: []
		});
		const prisma = makePrismaMock(findFirst);

		await getProjectDetail(prisma, 'ws_a', 'p1');

		expect(findFirst).toHaveBeenCalledWith(
			expect.objectContaining({
				where: { id: 'p1', workspaceId: 'ws_a' }
			})
		);
	});

	it('returns project with task summary fields only', async () => {
		const findFirst = vi.fn().mockResolvedValue({
			id: 'p1',
			workspaceId: 'ws_demo',
			title: 'Project A',
			description: 'Desc',
			status: 'ACTIVE',
			startDate: new Date('2026-01-01T00:00:00.000Z'),
			dueDate: null,
			archivedAt: null,
			createdAt: new Date('2026-01-01T00:00:00.000Z'),
			updatedAt: new Date('2026-01-02T00:00:00.000Z'),
			tasks: [
				{
					id: 't1',
					title: 'Task One',
					status: 'TODO',
					priority: 'HIGH',
					dueDate: new Date('2026-01-15T00:00:00.000Z'),
					assigneeId: 'u1',
					archivedAt: null,
					updatedAt: new Date('2026-01-03T00:00:00.000Z')
				}
			]
		});
		const prisma = makePrismaMock(findFirst);

		const result = await getProjectDetail(prisma, 'ws_demo', 'p1');

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.data.project.id).toBe('p1');
			expect(result.data.tasks).toEqual([
				{
					id: 't1',
					title: 'Task One',
					status: 'TODO',
					priority: 'HIGH',
					dueDate: new Date('2026-01-15T00:00:00.000Z'),
					assignee: 'u1'
				}
			]);
			expect(Object.keys(result.data.tasks[0]).sort()).toEqual([
				'assignee',
				'dueDate',
				'id',
				'priority',
				'status',
				'title'
			]);
		}
	});

	it('excludes archived tasks by default', async () => {
		const findFirst = vi.fn().mockResolvedValue({
			id: 'p1',
			workspaceId: 'ws_demo',
			title: 'Project A',
			description: null,
			status: 'ACTIVE',
			startDate: null,
			dueDate: null,
			archivedAt: null,
			createdAt: new Date('2026-01-01T00:00:00.000Z'),
			updatedAt: new Date('2026-01-02T00:00:00.000Z'),
			tasks: []
		});
		const prisma = makePrismaMock(findFirst);

		await getProjectDetail(prisma, 'ws_demo', 'p1');

		const args = findFirst.mock.calls[0][0];
		expect(args.select.tasks.where).toEqual({ archivedAt: null });
	});

	it('includes archived tasks when includeArchivedTasks=true', async () => {
		const findFirst = vi.fn().mockResolvedValue({
			id: 'p1',
			workspaceId: 'ws_demo',
			title: 'Project A',
			description: null,
			status: 'ACTIVE',
			startDate: null,
			dueDate: null,
			archivedAt: null,
			createdAt: new Date('2026-01-01T00:00:00.000Z'),
			updatedAt: new Date('2026-01-02T00:00:00.000Z'),
			tasks: []
		});
		const prisma = makePrismaMock(findFirst);

		await getProjectDetail(prisma, 'ws_demo', 'p1', { includeArchivedTasks: true });

		const args = findFirst.mock.calls[0][0];
		expect(args.select.tasks.where).toBeUndefined();
	});

	it('allows archived project to be retrieved', async () => {
		const findFirst = vi.fn().mockResolvedValue({
			id: 'p1',
			workspaceId: 'ws_demo',
			title: 'Archived Project',
			description: null,
			status: 'DONE',
			startDate: null,
			dueDate: null,
			archivedAt: new Date('2026-01-20T00:00:00.000Z'),
			createdAt: new Date('2026-01-01T00:00:00.000Z'),
			updatedAt: new Date('2026-01-21T00:00:00.000Z'),
			tasks: []
		});
		const prisma = makePrismaMock(findFirst);

		const result = await getProjectDetail(prisma, 'ws_demo', 'p1');

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.data.project.archivedAt).toEqual(new Date('2026-01-20T00:00:00.000Z'));
		}
	});

	it('returns not found error when project is missing', async () => {
		const prisma = makePrismaMock(vi.fn().mockResolvedValue(null));

		const result = await getProjectDetail(prisma, 'ws_demo', 'missing_project');

		expect(result).toEqual({
			ok: false,
			error: {
				code: 'NOT_FOUND',
				message: 'Project not found'
			}
		});
	});
});

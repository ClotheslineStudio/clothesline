import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { PrismaClient } from '$lib/generated/prisma/client';

import { getTaskDetail } from './taskDetail.server';

function makePrismaMock() {
	return {
		task: { findFirst: vi.fn() },
		edge: { findMany: vi.fn() },
		requirement: { findMany: vi.fn() }
	} as unknown as PrismaClient & {
		task: { findFirst: ReturnType<typeof vi.fn> };
		edge: { findMany: ReturnType<typeof vi.fn> };
		requirement: { findMany: ReturnType<typeof vi.fn> };
	};
}

const baseTask = {
	id: 'tsk_1',
	workspaceId: 'ws_demo',
	title: 'Task 1',
	status: 'TODO',
	priority: 'MEDIUM',
	dueDate: null,
	assigneeId: null,
	archivedAt: null,
	createdAt: new Date('2026-01-01T00:00:00.000Z'),
	updatedAt: new Date('2026-01-02T00:00:00.000Z')
};

describe('getTaskDetail', () => {
	let prisma: ReturnType<typeof makePrismaMock>;

	beforeEach(() => {
		prisma = makePrismaMock();
	});

	it('returns task with linked IMPLEMENTS requirements', async () => {
		prisma.task.findFirst.mockResolvedValue(baseTask);
		prisma.edge.findMany.mockResolvedValue([{ toId: 'req_2' }]);
		prisma.requirement.findMany.mockResolvedValue([
			{ id: 'req_2', title: 'Req 2', status: 'ACTIVE', priority: 'HIGH' }
		]);

		const res = await getTaskDetail(prisma, 'ws_demo', 'tsk_1');
		expect(res.ok).toBe(true);
		if (!res.ok) return;

		expect(res.data.task.id).toBe('tsk_1');
		expect(res.data.implementsRequirements).toEqual([
			{ id: 'req_2', title: 'Req 2', status: 'ACTIVE', priority: 'HIGH' }
		]);
		expect(Object.keys(res.data.implementsRequirements[0]).sort()).toEqual([
			'id',
			'priority',
			'status',
			'title'
		]);
	});

	it('enforces workspace scoping when loading task', async () => {
		prisma.task.findFirst.mockResolvedValue(null);

		const res = await getTaskDetail(prisma, 'ws_other', 'tsk_1');
		expect(res.ok).toBe(false);
		if (res.ok) return;

		expect(res.error.code).toBe('NOT_FOUND');
		expect(prisma.task.findFirst).toHaveBeenCalledWith(
			expect.objectContaining({
				where: expect.objectContaining({ id: 'tsk_1', workspaceId: 'ws_other' })
			})
		);
	});

	it('returns not found when task is missing', async () => {
		prisma.task.findFirst.mockResolvedValue(null);

		const res = await getTaskDetail(prisma, 'ws_demo', 'tsk_missing');
		expect(res).toEqual({
			ok: false,
			error: { code: 'NOT_FOUND', message: 'Task not found' }
		});
	});

	it('excludes archived requirements by default', async () => {
		prisma.task.findFirst.mockResolvedValue(baseTask);
		prisma.edge.findMany.mockResolvedValue([{ toId: 'req_2' }]);
		prisma.requirement.findMany.mockResolvedValue([]);

		await getTaskDetail(prisma, 'ws_demo', 'tsk_1');
		expect(prisma.requirement.findMany).toHaveBeenCalledWith(
			expect.objectContaining({
				where: expect.objectContaining({ archivedAt: null })
			})
		);
	});

	it('skips missing requirements referenced by edges', async () => {
		prisma.task.findFirst.mockResolvedValue(baseTask);
		prisma.edge.findMany.mockResolvedValue([{ toId: 'req_2' }, { toId: 'req_missing' }]);
		prisma.requirement.findMany.mockResolvedValue([
			{ id: 'req_2', title: 'Req 2', status: 'ACTIVE', priority: 'HIGH' }
		]);

		const res = await getTaskDetail(prisma, 'ws_demo', 'tsk_1');
		expect(res.ok).toBe(true);
		if (!res.ok) return;

		expect(res.data.implementsRequirements).toEqual([
			{ id: 'req_2', title: 'Req 2', status: 'ACTIVE', priority: 'HIGH' }
		]);
	});

	it('returns archived task details when task is archived', async () => {
		prisma.task.findFirst.mockResolvedValue({
			...baseTask,
			archivedAt: new Date('2026-02-01T00:00:00.000Z')
		});
		prisma.edge.findMany.mockResolvedValue([]);

		const res = await getTaskDetail(prisma, 'ws_demo', 'tsk_1');
		expect(res.ok).toBe(true);
		if (!res.ok) return;
		expect(res.data.task.archivedAt).not.toBeNull();
	});
});

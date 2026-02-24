import { describe, expect, it, vi } from 'vitest';
import type { PrismaClient, Task } from '$lib/generated/prisma/client';
import { TaskPriority, TaskStatus } from '$lib/generated/prisma/client';
import { decodeTaskListCursor, listTasks } from './taskList.server';
import { parseTaskListQuery } from '$lib/validation/taskList';

type TaskRow = Pick<
	Task,
	| 'id'
	| 'workspaceId'
	| 'title'
	| 'body'
	| 'status'
	| 'priority'
	| 'assigneeId'
	| 'projectId'
	| 'dueDate'
	| 'archivedAt'
	| 'createdAt'
	| 'updatedAt'
>;

function makeTask(id: string, overrides: Partial<TaskRow> = {}): TaskRow {
	const createdAt = new Date('2026-02-01T10:00:00.000Z');
	const updatedAt = new Date('2026-02-02T10:00:00.000Z');
	return {
		id,
		workspaceId: 'ws_demo',
		title: `Task ${id}`,
		body: null,
		status: TaskStatus.TODO,
		priority: TaskPriority.MEDIUM,
		assigneeId: null,
		projectId: null,
		dueDate: null,
		archivedAt: null,
		createdAt,
		updatedAt,
		...overrides
	};
}

function prismaMock(rows: TaskRow[]) {
	const findMany = vi.fn().mockResolvedValue(rows);
	const prisma = { task: { findMany } } as unknown as PrismaClient;
	return { prisma, findMany };
}

describe('parseTaskListQuery', () => {
	it('defaults workspace and sort and excludes archived', () => {
		const parsed = parseTaskListQuery(new URLSearchParams());
		expect(parsed.ok).toBe(true);
		if (!parsed.ok) return;
		expect(parsed.data.workspaceId).toBe('ws_demo');
		expect(parsed.data.includeArchived).toBe(false);
		expect(parsed.data.sort).toEqual({ field: 'updatedAt', direction: 'desc' });
		expect(parsed.data.limit).toBe(25);
	});

	it('parses repeated status/priority and due date UTC bounds', () => {
		const params = new URLSearchParams();
		params.append('status', 'TODO');
		params.append('status', 'IN_PROGRESS');
		params.append('priority', 'HIGH');
		params.set('dueFrom', '2026-02-01');
		params.set('dueTo', '2026-02-28');
		params.set('sort', 'dueDate:asc');
		params.set('includeArchived', 'true');
		const parsed = parseTaskListQuery(params);
		expect(parsed.ok).toBe(true);
		if (!parsed.ok) return;
		expect(parsed.data.status).toEqual([TaskStatus.TODO, TaskStatus.IN_PROGRESS]);
		expect(parsed.data.priority).toEqual([TaskPriority.HIGH]);
		expect(parsed.data.dueFrom?.toISOString()).toBe('2026-02-01T00:00:00.000Z');
		expect(parsed.data.dueTo?.toISOString()).toBe('2026-02-28T23:59:59.999Z');
		expect(parsed.data.sort).toEqual({ field: 'dueDate', direction: 'asc' });
		expect(parsed.data.includeArchived).toBe(true);
	});

	it('returns field errors for invalid range and limit', () => {
		const parsed = parseTaskListQuery(
			new URLSearchParams({
				dueFrom: '2026-03-10',
				dueTo: '2026-03-01',
				limit: '101'
			})
		);
		expect(parsed.ok).toBe(false);
		if (parsed.ok) return;
		expect(parsed.fieldErrors.dueFrom).toBeTruthy();
		expect(parsed.fieldErrors.limit).toBeTruthy();
	});
});

describe('listTasks', () => {
	it('always scopes by workspace and excludes archived by default', async () => {
		const { prisma, findMany } = prismaMock([]);
		await listTasks(prisma, 'ws_demo', {
			sort: { field: 'updatedAt', direction: 'desc' },
			limit: 25
		});

		const args = findMany.mock.calls[0][0];
		expect(args.where.workspaceId).toBe('ws_demo');
		expect(args.where.archivedAt).toBeNull();
	});

	it('includes archived when includeArchived=true', async () => {
		const { prisma, findMany } = prismaMock([]);
		await listTasks(prisma, 'ws_demo', {
			includeArchived: true,
			sort: { field: 'updatedAt', direction: 'desc' },
			limit: 25
		});

		const args = findMany.mock.calls[0][0];
		expect(args.where.archivedAt).toBeUndefined();
	});

	it('applies status/priority/assignee/project/due filters', async () => {
		const { prisma, findMany } = prismaMock([]);
		const dueFrom = new Date('2026-02-01T00:00:00.000Z');
		const dueTo = new Date('2026-02-28T23:59:59.999Z');

		await listTasks(prisma, 'ws_demo', {
			status: [TaskStatus.TODO, TaskStatus.IN_PROGRESS],
			priority: [TaskPriority.HIGH],
			assigneeId: 'usr_1',
			projectId: 'prj_1',
			dueFrom,
			dueTo,
			sort: { field: 'updatedAt', direction: 'desc' },
			limit: 25
		});

		const args = findMany.mock.calls[0][0];
		expect(args.where.status).toEqual({ in: [TaskStatus.TODO, TaskStatus.IN_PROGRESS] });
		expect(args.where.priority).toEqual({ in: [TaskPriority.HIGH] });
		expect(args.where.assigneeId).toBe('usr_1');
		expect(args.where.projectId).toBe('prj_1');
		expect(args.where.dueDate).toEqual({ not: null, gte: dueFrom, lte: dueTo });
	});

	it('uses updatedAt desc by default and supports dueDate asc sort', async () => {
		const a = prismaMock([]);
		await listTasks(a.prisma, 'ws_demo', {
			sort: { field: 'updatedAt', direction: 'desc' },
			limit: 25
		});
		expect(a.findMany.mock.calls[0][0].orderBy).toEqual([{ updatedAt: 'desc' }, { id: 'desc' }]);

		const b = prismaMock([]);
		await listTasks(b.prisma, 'ws_demo', {
			sort: { field: 'dueDate', direction: 'asc' },
			limit: 25
		});
		expect(b.findMany.mock.calls[0][0].orderBy).toEqual([
			{ dueDate: 'asc' },
			{ updatedAt: 'desc' },
			{ id: 'desc' }
		]);
	});

	it('uses limit+1 and returns hasMore with nextCursor', async () => {
		const rows = [
			makeTask('t1', { updatedAt: new Date('2026-02-10T10:00:00.000Z') }),
			makeTask('t2', { updatedAt: new Date('2026-02-09T10:00:00.000Z') }),
			makeTask('t3', { updatedAt: new Date('2026-02-08T10:00:00.000Z') })
		];
		const { prisma, findMany } = prismaMock(rows);

		const result = await listTasks(prisma, 'ws_demo', {
			sort: { field: 'updatedAt', direction: 'desc' },
			limit: 2
		});

		expect(findMany.mock.calls[0][0].take).toBe(3);
		expect(result.hasMore).toBe(true);
		expect(result.items).toHaveLength(2);
		expect(result.nextCursor).toBeTruthy();
		const decoded = decodeTaskListCursor(result.nextCursor ?? '');
		expect(decoded?.id).toBe('t2');
	});

	it('passes cursor id to prisma cursor pagination', async () => {
		const { prisma, findMany } = prismaMock([]);
		await listTasks(prisma, 'ws_demo', {
			sort: { field: 'updatedAt', direction: 'desc' },
			limit: 10,
			cursor: { id: 'task_1', sortValue: new Date('2026-02-01T00:00:00.000Z') }
		});

		const args = findMany.mock.calls[0][0];
		expect(args.cursor).toEqual({ id: 'task_1' });
		expect(args.skip).toBe(1);
	});
});

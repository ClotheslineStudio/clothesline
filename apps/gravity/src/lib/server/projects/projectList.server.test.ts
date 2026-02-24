import assert from 'node:assert/strict';
import test from 'node:test';
import { listProjects, decodeProjectListCursor } from '$lib/server/projects/projectList.server';

function makePrisma(returnItems: Array<{ id: string; updatedAt: Date }>) {
	const calls: Array<Record<string, unknown>> = [];
	return {
		prisma: {
			project: {
				findMany: async (args: Record<string, unknown>) => {
					calls.push(args);
					return returnItems;
				}
			}
		},
		calls
	};
}

test('workspace scoping + archived default exclusion + ordering', async () => {
	const sample = [{ id: 'b', updatedAt: new Date('2026-01-01T00:00:00.000Z') }];
	const { prisma, calls } = makePrisma(sample);

	await listProjects(prisma as never, 'ws_demo', { limit: 25 });

	const call = calls[0];
	assert.equal((call.where as Record<string, unknown>).workspaceId, 'ws_demo');
	assert.equal((call.where as Record<string, unknown>).archivedAt, null);
	assert.deepEqual(call.orderBy, [{ updatedAt: 'desc' }, { id: 'desc' }]);
	assert.equal(call.take, 26);
});

test('includeArchived=true omits archivedAt null constraint', async () => {
	const { prisma, calls } = makePrisma([]);

	await listProjects(prisma as never, 'ws_demo', { limit: 10, includeArchived: true });

	const where = calls[0].where as Record<string, unknown>;
	assert.equal(where.archivedAt, undefined);
});

test('status/owner/due bounds filters are passed', async () => {
	const { prisma, calls } = makePrisma([]);

	await listProjects(prisma as never, 'ws_demo', {
		limit: 10,
		status: ['ACTIVE', 'DRAFT'],
		ownerId: 'user_123',
		dueFrom: new Date('2026-02-01T00:00:00.000Z'),
		dueTo: new Date('2026-02-28T23:59:59.999Z')
	});

	const where = calls[0].where as Record<string, any>;
	assert.deepEqual(where.status, { in: ['ACTIVE', 'DRAFT'] });
	assert.equal(where.ownerId, 'user_123');
	assert.deepEqual(where.dueDate, {
		gte: new Date('2026-02-01T00:00:00.000Z'),
		lte: new Date('2026-02-28T23:59:59.999Z')
	});
});

test('limit is capped + hasMore with next cursor', async () => {
	const rows = [
		{ id: 'c', updatedAt: new Date('2026-01-03T00:00:00.000Z') },
		{ id: 'b', updatedAt: new Date('2026-01-02T00:00:00.000Z') },
		{ id: 'a', updatedAt: new Date('2026-01-01T00:00:00.000Z') }
	];
	const { prisma, calls } = makePrisma(rows);

	const result = await listProjects(prisma as never, 'ws_demo', { limit: 2 });

	assert.equal(calls[0].take, 3);
	assert.equal(result.items.length, 2);
	assert.equal(result.hasMore, true);
	assert.ok(result.nextCursor);
	const decoded = decodeProjectListCursor(result.nextCursor);
	assert.equal(decoded?.id, 'b');
});

test('cursor pagination adds stable tie-breaker filter', async () => {
	const { prisma, calls } = makePrisma([]);

	await listProjects(prisma as never, 'ws_demo', {
		limit: 5,
		cursor: { id: 'proj_2', updatedAt: new Date('2026-02-10T10:00:00.000Z') }
	});

	const where = calls[0].where as Record<string, any>;
	assert.deepEqual(where.OR, [
		{ updatedAt: { lt: new Date('2026-02-10T10:00:00.000Z') } },
		{ updatedAt: new Date('2026-02-10T10:00:00.000Z'), id: { lt: 'proj_2' } }
	]);
});

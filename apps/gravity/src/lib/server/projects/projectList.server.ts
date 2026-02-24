import type { PrismaClient, ProjectStatus } from '$lib/generated/prisma/client';
import type { Prisma } from '$lib/generated/prisma/client';

type ProjectListCursor = {
	updatedAt: Date;
	id: string;
};

type ProjectListOptions = {
	status?: ProjectStatus[];
	ownerId?: string;
	dueFrom?: Date;
	dueTo?: Date;
	includeArchived?: boolean;
	limit: number;
	cursor?: ProjectListCursor;
	sort?: { field: 'updatedAt'; direction: 'desc' };
};

export type EncodedProjectListCursor = string;

export function encodeProjectListCursor(cursor: ProjectListCursor): EncodedProjectListCursor {
	return Buffer.from(
		JSON.stringify({ updatedAt: cursor.updatedAt.toISOString(), id: cursor.id })
	).toString('base64url');
}

export function decodeProjectListCursor(cursor?: string): ProjectListCursor | undefined {
	if (!cursor) return undefined;

	try {
		const parsed = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf-8')) as {
			updatedAt?: string;
			id?: string;
		};

		if (!parsed.updatedAt || !parsed.id) return undefined;

		const updatedAt = new Date(parsed.updatedAt);
		if (Number.isNaN(updatedAt.getTime())) return undefined;

		return { updatedAt, id: parsed.id };
	} catch {
		return undefined;
	}
}

export async function listProjects(
	prisma: PrismaClient,
	workspaceId: string,
	opts: ProjectListOptions
) {
	const limit = Math.min(Math.max(opts.limit, 1), 100);

	const where: Prisma.ProjectWhereInput = {
		workspaceId,
		...(opts.includeArchived ? {} : { archivedAt: null }),
		...(opts.status?.length ? { status: { in: opts.status } } : {}),
		...(opts.ownerId ? { ownerId: opts.ownerId } : {}),
		...(opts.dueFrom || opts.dueTo
			? {
					dueDate: {
						...(opts.dueFrom ? { gte: opts.dueFrom } : {}),
						...(opts.dueTo ? { lte: opts.dueTo } : {})
					}
				}
			: {}),
		...(opts.cursor
			? {
					OR: [
						{ updatedAt: { lt: opts.cursor.updatedAt } },
						{ updatedAt: opts.cursor.updatedAt, id: { lt: opts.cursor.id } }
					]
				}
			: {})
	};

	const items = await prisma.project.findMany({
		where,
		orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
		take: limit + 1
	});

	const hasMore = items.length > limit;
	const pageItems = hasMore ? items.slice(0, limit) : items;
	const last = pageItems.at(-1);

	return {
		items: pageItems,
		hasMore,
		nextCursor:
			hasMore && last
				? encodeProjectListCursor({ updatedAt: last.updatedAt, id: last.id })
				: undefined
	};
}

import type { Prisma, PrismaClient, Task, TaskPriority, TaskStatus } from '$lib/generated/prisma/client';

type TaskListSortField = 'updatedAt' | 'dueDate';
type TaskListSortDirection = 'asc' | 'desc';

export type TaskListCursor = {
	id: string;
	sortValue: Date | null;
};

export type ListTasksOptions = {
	status?: TaskStatus[];
	priority?: TaskPriority[];
	assigneeId?: string;
	projectId?: string;
	dueFrom?: Date;
	dueTo?: Date;
	includeArchived?: boolean;
	sort: { field: TaskListSortField; direction: TaskListSortDirection };
	limit: number;
	cursor?: TaskListCursor;
};

export type TaskListItem = Pick<
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

export type ListTasksResult = {
	ok: true;
	items: TaskListItem[];
	hasMore: boolean;
	nextCursor?: string;
};

type EncodedCursor = {
	id: string;
	sortValue: string | null;
};

export function encodeTaskListCursor(sortField: TaskListSortField, item: TaskListItem): string {
	const sortValue = sortField === 'dueDate' ? item.dueDate : item.updatedAt;
	const payload: EncodedCursor = {
		id: item.id,
		sortValue: sortValue ? sortValue.toISOString() : null
	};

	return Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
}

export function decodeTaskListCursor(value: string): TaskListCursor | null {
	try {
		const decoded = JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as Partial<EncodedCursor>;
		if (!decoded || typeof decoded !== 'object') return null;
		if (typeof decoded.id !== 'string' || decoded.id.trim() === '') return null;
		if (decoded.sortValue !== null && decoded.sortValue !== undefined) {
			if (typeof decoded.sortValue !== 'string') return null;
			const parsed = new Date(decoded.sortValue);
			if (Number.isNaN(parsed.getTime())) return null;
			return { id: decoded.id, sortValue: parsed };
		}
		return { id: decoded.id, sortValue: null };
	} catch {
		return null;
	}
}

function buildWhere(workspaceId: string, opts: ListTasksOptions): Prisma.TaskWhereInput {
	const where: Prisma.TaskWhereInput = { workspaceId };

	if (!opts.includeArchived) where.archivedAt = null;
	if (opts.status?.length) where.status = { in: opts.status };
	if (opts.priority?.length) where.priority = { in: opts.priority };
	if (opts.assigneeId) where.assigneeId = opts.assigneeId;
	if (opts.projectId) where.projectId = opts.projectId;

	if (opts.dueFrom || opts.dueTo) {
		where.dueDate = {
			not: null,
			...(opts.dueFrom ? { gte: opts.dueFrom } : {}),
			...(opts.dueTo ? { lte: opts.dueTo } : {})
		};
	}

	return where;
}

function buildOrderBy(
	sort: ListTasksOptions['sort']
): Prisma.TaskOrderByWithRelationInput[] | Prisma.TaskOrderByWithRelationInput {
	if (sort.field === 'dueDate') {
		return [{ dueDate: sort.direction }, { updatedAt: 'desc' }, { id: 'desc' }];
	}

	return [{ updatedAt: sort.direction }, { id: sort.direction }];
}

export async function listTasks(
	prisma: PrismaClient,
	workspaceId: string,
	opts: ListTasksOptions
): Promise<ListTasksResult> {
	const where = buildWhere(workspaceId, opts);
	const orderBy = buildOrderBy(opts.sort);
	const take = opts.limit + 1;

	const rows = await prisma.task.findMany({
		where,
		orderBy,
		take,
		...(opts.cursor ? { cursor: { id: opts.cursor.id }, skip: 1 } : {}),
		select: {
			id: true,
			workspaceId: true,
			title: true,
			body: true,
			status: true,
			priority: true,
			assigneeId: true,
			projectId: true,
			dueDate: true,
			archivedAt: true,
			createdAt: true,
			updatedAt: true
		}
	});

	const hasMore = rows.length > opts.limit;
	const items = hasMore ? rows.slice(0, opts.limit) : rows;
	const last = items.at(-1);
	const nextCursor = hasMore && last ? encodeTaskListCursor(opts.sort.field, last) : undefined;

	return {
		ok: true,
		items,
		hasMore,
		...(nextCursor ? { nextCursor } : {})
	};
}

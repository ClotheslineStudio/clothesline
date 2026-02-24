import { z } from 'zod';
import { TaskPriority, TaskStatus } from '$lib/generated/prisma/client';

const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;

type TaskListSortField = 'updatedAt' | 'dueDate';
type TaskListSortDirection = 'asc' | 'desc';

export type TaskListQuery = {
	workspaceId: string;
	status?: TaskStatus[];
	priority?: TaskPriority[];
	assigneeId?: string;
	projectId?: string;
	dueFrom?: Date;
	dueTo?: Date;
	includeArchived: boolean;
	sort: { field: TaskListSortField; direction: TaskListSortDirection };
	limit: number;
	cursor?: string;
};

type ValidationErrorResult = {
	ok: false;
	message: string;
	fieldErrors: Record<string, string>;
};

type ValidationOkResult = {
	ok: true;
	data: TaskListQuery;
};

export type TaskListQueryParseResult = ValidationErrorResult | ValidationOkResult;

const TaskStatusValues = Object.values(TaskStatus) as [TaskStatus, ...TaskStatus[]];
const TaskPriorityValues = Object.values(TaskPriority) as [TaskPriority, ...TaskPriority[]];

const TaskStatusSchema = z.enum(TaskStatusValues);
const TaskPrioritySchema = z.enum(TaskPriorityValues);

function cleanOptionalString(value: unknown): string | undefined {
	if (typeof value !== 'string') return undefined;
	const trimmed = value.trim();
	return trimmed === '' ? undefined : trimmed;
}

function listParamFromSearchParams(searchParams: URLSearchParams, key: string): string[] | undefined {
	const values = searchParams
		.getAll(key)
		.flatMap((value) => value.split(','))
		.map((value) => value.trim())
		.filter(Boolean);
	return values.length ? values : undefined;
}

function parseBooleanParam(value: unknown): boolean | undefined {
	if (typeof value === 'boolean') return value;
	if (typeof value !== 'string') return undefined;
	const normalized = value.trim().toLowerCase();
	if (normalized === 'true' || normalized === '1') return true;
	if (normalized === 'false' || normalized === '0' || normalized === '') return false;
	return undefined;
}

function parseDateOnlyStartUtc(value: string): Date {
	return new Date(`${value}T00:00:00.000Z`);
}

function parseDateOnlyEndUtc(value: string): Date {
	return new Date(`${value}T23:59:59.999Z`);
}

const TaskListQuerySchema = z
	.object({
		workspaceId: z
			.string()
			.optional()
			.transform((value) => cleanOptionalString(value) ?? 'ws_demo'),
		status: z.array(TaskStatusSchema).optional(),
		priority: z.array(TaskPrioritySchema).optional(),
		assigneeId: z
			.string()
			.optional()
			.transform((value) => cleanOptionalString(value)),
		projectId: z
			.string()
			.optional()
			.transform((value) => cleanOptionalString(value)),
		dueFrom: z
			.string()
			.optional()
			.transform((value) => cleanOptionalString(value))
			.refine((value) => !value || DATE_ONLY_RE.test(value), {
				message: 'Enter a valid date (YYYY-MM-DD)'
			}),
		dueTo: z
			.string()
			.optional()
			.transform((value) => cleanOptionalString(value))
			.refine((value) => !value || DATE_ONLY_RE.test(value), {
				message: 'Enter a valid date (YYYY-MM-DD)'
			}),
		includeArchived: z
			.union([z.boolean(), z.string()])
			.optional()
			.transform((value) => parseBooleanParam(value) ?? false),
		sort: z
			.enum(['updatedAt:desc', 'updatedAt:asc', 'dueDate:asc', 'dueDate:desc'])
			.optional()
			.default('updatedAt:desc'),
		limit: z.coerce.number().int().min(1).max(100).optional().default(25),
		cursor: z
			.string()
			.optional()
			.transform((value) => cleanOptionalString(value))
	})
	.superRefine((value, ctx) => {
		if (!value.dueFrom || !value.dueTo) return;
		const start = parseDateOnlyStartUtc(value.dueFrom);
		const end = parseDateOnlyEndUtc(value.dueTo);
		if (start.getTime() <= end.getTime()) return;
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ['dueFrom'],
			message: 'dueFrom must be before or equal to dueTo'
		});
	});

function zodFieldErrors(error: z.ZodError): Record<string, string> {
	const fieldErrors: Record<string, string> = {};
	for (const issue of error.issues) {
		const key = issue.path.length ? String(issue.path[0]) : 'form';
		if (!fieldErrors[key]) fieldErrors[key] = issue.message;
	}
	return fieldErrors;
}

function parseSort(sort: string): { field: TaskListSortField; direction: TaskListSortDirection } {
	const [field, direction] = sort.split(':') as [TaskListSortField, TaskListSortDirection];
	return { field, direction };
}

export function parseTaskListQuery(searchParams: URLSearchParams): TaskListQueryParseResult {
	const raw = {
		workspaceId: searchParams.get('workspaceId') ?? undefined,
		status: listParamFromSearchParams(searchParams, 'status'),
		priority: listParamFromSearchParams(searchParams, 'priority'),
		assigneeId: searchParams.get('assigneeId') ?? undefined,
		projectId: searchParams.get('projectId') ?? undefined,
		dueFrom: searchParams.get('dueFrom') ?? undefined,
		dueTo: searchParams.get('dueTo') ?? undefined,
		includeArchived: searchParams.get('includeArchived') ?? undefined,
		sort: searchParams.get('sort') ?? undefined,
		limit: searchParams.get('limit') ?? undefined,
		cursor: searchParams.get('cursor') ?? undefined
	};

	const parsed = TaskListQuerySchema.safeParse(raw);
	if (!parsed.success) {
		return {
			ok: false,
			message: 'Validation failed.',
			fieldErrors: zodFieldErrors(parsed.error)
		};
	}

	const value = parsed.data;
	return {
		ok: true,
		data: {
			workspaceId: value.workspaceId,
			status: value.status?.length ? value.status : undefined,
			priority: value.priority?.length ? value.priority : undefined,
			assigneeId: value.assigneeId,
			projectId: value.projectId,
			dueFrom: value.dueFrom ? parseDateOnlyStartUtc(value.dueFrom) : undefined,
			dueTo: value.dueTo ? parseDateOnlyEndUtc(value.dueTo) : undefined,
			includeArchived: value.includeArchived,
			sort: parseSort(value.sort),
			limit: value.limit,
			cursor: value.cursor
		}
	};
}

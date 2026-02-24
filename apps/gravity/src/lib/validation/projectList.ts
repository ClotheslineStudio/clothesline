import { ProjectStatusSchema } from '$lib/validation/projects';
import { z } from 'zod';

const EMPTY_TO_UNDEFINED = z
	.string()
	.optional()
	.transform((value) => {
		const trimmed = value?.trim();
		return trimmed ? trimmed : undefined;
	});

const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const DateParam = EMPTY_TO_UNDEFINED.refine((value) => {
	if (!value) return true;
	if (DATE_ONLY_PATTERN.test(value)) return true;
	const parsed = new Date(value);
	return !Number.isNaN(parsed.getTime());
}, 'Invalid date format');

const SortParam = EMPTY_TO_UNDEFINED.transform((value) =>
	value === 'updatedAt:desc' ? value : 'updatedAt:desc'
);

const parseBoolean = (value: unknown): boolean => {
	if (typeof value === 'boolean') return value;
	if (typeof value === 'string') {
		return value === 'true' || value === '1';
	}
	return false;
};

const StatusParam = z
	.union([z.string(), z.array(z.string())])
	.optional()
	.transform((value) => {
		if (!value) return undefined;

		const list = Array.isArray(value) ? value : [value];
		const normalized = list
			.flatMap((entry) => entry.split(','))
			.map((entry) => entry.trim())
			.filter(Boolean)
			.filter((entry): entry is z.infer<typeof ProjectStatusSchema> =>
				ProjectStatusSchema.options.includes(entry as z.infer<typeof ProjectStatusSchema>)
			);

		return normalized.length ? Array.from(new Set(normalized)) : undefined;
	});

export const ProjectListQuerySchema = z
	.object({
		workspaceId: EMPTY_TO_UNDEFINED.default('ws_demo'),
		status: StatusParam,
		ownerId: EMPTY_TO_UNDEFINED,
		dueFrom: DateParam,
		dueTo: DateParam,
		includeArchived: z
			.union([z.boolean(), z.string()])
			.optional()
			.transform((value) => parseBoolean(value))
			.default(false),
		sort: SortParam.default('updatedAt:desc'),
		limit: z.coerce.number().int().min(1).max(100).optional().default(25),
		cursor: EMPTY_TO_UNDEFINED
	})
	.superRefine((value, ctx) => {
		if (!value.dueFrom || !value.dueTo) return;

		const start = parseDateBound(value.dueFrom, 'start');
		const end = parseDateBound(value.dueTo, 'end');
		if (!start || !end) return;

		if (start > end) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['dueFrom'],
				message: 'dueFrom must be earlier than or equal to dueTo'
			});
		}
	});

export type ProjectListQuery = z.infer<typeof ProjectListQuerySchema>;

export function parseDateBound(input: string, bound: 'start' | 'end'): Date | undefined {
	if (!input) return undefined;

	if (DATE_ONLY_PATTERN.test(input)) {
		const suffix = bound === 'start' ? 'T00:00:00.000Z' : 'T23:59:59.999Z';
		const parsed = new Date(`${input}${suffix}`);
		return Number.isNaN(parsed.getTime()) ? undefined : parsed;
	}

	const parsed = new Date(input);
	return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export function zodIssuesToFieldErrors(error: z.ZodError): Record<string, string> {
	const fieldErrors: Record<string, string> = {};

	for (const issue of error.issues) {
		const key = issue.path[0]?.toString() ?? 'form';
		if (!fieldErrors[key]) {
			fieldErrors[key] = issue.message;
		}
	}

	return fieldErrors;
}

import { z, type ZodError } from 'zod';

export const TaskStatusSchema = z.enum(['TODO', 'IN_PROGRESS', 'BLOCKED', 'DONE']);
export const TaskPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);

function parseOptionalDateForCreate(value: unknown): Date | undefined {
	if (value === undefined || value === null || value === '') return undefined;
	if (value instanceof Date) return Number.isNaN(value.getTime()) ? undefined : value;
	if (typeof value !== 'string') return undefined;

	const trimmed = value.trim();
	if (!trimmed) return undefined;

	const parsed = new Date(trimmed);
	return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function parseOptionalDateForUpdate(value: unknown): Date | null | undefined {
	if (value === undefined) return undefined;
	if (value === null || value === '') return null;
	if (value instanceof Date) return Number.isNaN(value.getTime()) ? undefined : value;
	if (typeof value !== 'string') return undefined;

	const trimmed = value.trim();
	if (!trimmed) return null;

	const parsed = new Date(trimmed);
	return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

const OptionalString = z
	.string()
	.trim()
	.optional()
	.transform((value) => (value === '' ? undefined : value));

const OptionalStringOrNull = z
	.string()
	.trim()
	.optional()
	.transform((value) => {
		if (value === undefined) return undefined;
		return value === '' ? null : value;
	});

const CreateDateInput = z
	.union([z.string(), z.date()])
	.optional()
	.transform((value, ctx) => {
		const parsed = parseOptionalDateForCreate(value);
		if (value !== undefined && value !== null && value !== '' && parsed === undefined) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Enter a valid due date (ISO date or datetime)'
			});
			return z.NEVER;
		}
		return parsed;
	});

const UpdateDateInput = z
	.union([z.string(), z.date(), z.null()])
	.optional()
	.transform((value, ctx) => {
		const parsed = parseOptionalDateForUpdate(value);
		if (value !== undefined && parsed === undefined) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Enter a valid due date (ISO date or datetime)'
			});
			return z.NEVER;
		}
		return parsed;
	});

export const CreateTaskSchema = z.object({
	title: z.string().trim().min(1, 'Title is required'),
	description: OptionalString,
	status: TaskStatusSchema.default('TODO'),
	priority: TaskPrioritySchema.default('MEDIUM'),
	dueDate: CreateDateInput,
	assigneeId: OptionalString,
	projectId: OptionalString
});

export const UpdateTaskSchema = z
	.object({
		id: z.string().trim().min(1, 'Missing task id'),
		title: z.string().trim().min(1, 'Title is required').optional(),
		description: OptionalStringOrNull,
		status: TaskStatusSchema.optional(),
		priority: TaskPrioritySchema.optional(),
		dueDate: UpdateDateInput,
		assigneeId: OptionalStringOrNull,
		projectId: OptionalStringOrNull
	})
	.refine(
		(value) =>
			value.title !== undefined ||
			value.description !== undefined ||
			value.status !== undefined ||
			value.priority !== undefined ||
			value.dueDate !== undefined ||
			value.assigneeId !== undefined ||
			value.projectId !== undefined,
		{ message: 'No fields provided to update.' }
	);

export function zodFieldErrors(error: ZodError): Record<string, string> {
	const fieldErrors: Record<string, string> = {};

	for (const issue of error.issues) {
		const key = issue.path.length > 0 ? String(issue.path[0]) : 'form';
		if (!fieldErrors[key]) fieldErrors[key] = issue.message;
	}

	return fieldErrors;
}

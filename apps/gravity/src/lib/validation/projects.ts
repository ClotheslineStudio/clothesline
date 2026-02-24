import { z, type ZodError } from 'zod';

export const ProjectStatusSchema = z.enum(['DRAFT', 'ACTIVE', 'ON_HOLD', 'DONE']);

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

const CreateDateInput = z
	.union([z.string(), z.date()])
	.optional()
	.transform((value, ctx) => {
		const parsed = parseOptionalDateForCreate(value);
		if (value !== undefined && value !== null && value !== '' && parsed === undefined) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Enter a valid date'
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
				message: 'Enter a valid date'
			});
			return z.NEVER;
		}
		return parsed;
	});

export const CreateProjectSchema = z
	.object({
		title: z.string().trim().min(1, 'Title is required'),
		description: z
			.string()
			.trim()
			.optional()
			.transform((value) => (value === '' ? undefined : value)),
		status: ProjectStatusSchema.default('DRAFT'),
		startDate: CreateDateInput,
		dueDate: CreateDateInput
	})
	.superRefine((value, ctx) => {
		if (value.startDate && value.dueDate && value.startDate > value.dueDate) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['dueDate'],
				message: 'Due date must be on or after the start date'
			});
		}
	});

export const UpdateProjectSchema = z
	.object({
		id: z.string().trim().min(1, 'Missing project id'),
		title: z.string().trim().min(1, 'Title is required').optional(),
		description: z
			.string()
			.trim()
			.optional()
			.transform((value) => {
				if (value === undefined) return undefined;
				return value === '' ? null : value;
			}),
		status: ProjectStatusSchema.optional(),
		startDate: UpdateDateInput,
		dueDate: UpdateDateInput
	})
	.refine(
		(value) =>
			value.title !== undefined ||
			value.description !== undefined ||
			value.status !== undefined ||
			value.startDate !== undefined ||
			value.dueDate !== undefined,
		{ message: 'No fields provided to update.' }
	)
	.superRefine((value, ctx) => {
		if (value.startDate && value.dueDate && value.startDate > value.dueDate) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['dueDate'],
				message: 'Due date must be on or after the start date'
			});
		}
	});

export function zodFieldErrors(error: ZodError): Record<string, string> {
	const fieldErrors: Record<string, string> = {};

	for (const issue of error.issues) {
		const key = issue.path.length > 0 ? String(issue.path[0]) : 'form';
		if (!fieldErrors[key]) fieldErrors[key] = issue.message;
	}

	return fieldErrors;
}

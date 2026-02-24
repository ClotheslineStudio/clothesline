import { z, type ZodError } from 'zod';

export const TaskDetailQuerySchema = z.object({
	workspaceId: z.string().trim().min(1, 'workspaceId is required').default('ws_demo'),
	includeArchivedRequirements: z
		.string()
		.optional()
		.default('false')
		.transform((value) => value === 'true' || value === '1')
});

export const TaskDetailParamsSchema = z.object({
	taskId: z.string().trim().min(1, 'Missing task id')
});

export function zodFieldErrors(error: ZodError): Record<string, string> {
	const fieldErrors: Record<string, string> = {};
	for (const issue of error.issues) {
		const key = issue.path.length ? String(issue.path[0]) : 'form';
		if (!fieldErrors[key]) fieldErrors[key] = issue.message;
	}
	return fieldErrors;
}

export function validationFailure(message: string, fieldErrors?: Record<string, string>) {
	return { ok: false as const, message, fieldErrors };
}

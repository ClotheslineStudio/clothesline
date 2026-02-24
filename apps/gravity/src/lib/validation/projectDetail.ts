import { z, type ZodError } from 'zod';

const QueryBoolean = z.preprocess((value) => {
	if (value === undefined || value === null || value === '') return undefined;
	if (typeof value === 'boolean') return value;
	if (typeof value === 'string') {
		const normalized = value.trim().toLowerCase();
		if (normalized === 'true') return true;
		if (normalized === 'false') return false;
	}
	return value;
}, z.boolean().default(false));

export const ProjectDetailQuerySchema = z.object({
	workspaceId: z.string().trim().min(1, 'workspaceId is required').default('ws_demo'),
	includeArchivedTasks: QueryBoolean
});

export const ProjectDetailParamsSchema = z.object({
	projectId: z.string().trim().min(1, 'projectId is required')
});

export type ProjectDetailQuery = z.infer<typeof ProjectDetailQuerySchema>;
export type ProjectDetailParams = z.infer<typeof ProjectDetailParamsSchema>;

export function zodFieldErrors(error: ZodError): Record<string, string> {
	const fieldErrors: Record<string, string> = {};

	for (const issue of error.issues) {
		const key = issue.path.length > 0 ? String(issue.path[0]) : 'form';
		if (!fieldErrors[key]) fieldErrors[key] = issue.message;
	}

	return fieldErrors;
}

export function invalidRequestFromZod(error: ZodError) {
	return {
		ok: false as const,
		message: 'Invalid request',
		fieldErrors: zodFieldErrors(error)
	};
}

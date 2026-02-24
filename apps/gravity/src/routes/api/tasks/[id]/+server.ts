import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { getTaskDetail } from '$lib/server/tasks/taskDetail.server';
import {
	TaskDetailParamsSchema,
	TaskDetailQuerySchema,
	validationFailure,
	zodFieldErrors
} from '$lib/validation/taskDetail';

export async function GET({ url, params }: { url: URL; params: { id: string } }) {
	const parsedParams = TaskDetailParamsSchema.safeParse({ taskId: params.id });
	const parsedQuery = TaskDetailQuerySchema.safeParse({
		workspaceId: url.searchParams.get('workspaceId') ?? undefined,
		includeArchivedRequirements: url.searchParams.get('includeArchivedRequirements') ?? undefined
	});

	if (!parsedParams.success || !parsedQuery.success) {
		const fieldErrors = {
			...(parsedParams.success ? {} : zodFieldErrors(parsedParams.error)),
			...(parsedQuery.success ? {} : zodFieldErrors(parsedQuery.error))
		};
		return json(validationFailure('Invalid request', fieldErrors), { status: 400 });
	}

	const result = await getTaskDetail(
		prisma,
		parsedQuery.data.workspaceId,
		parsedParams.data.taskId,
		{ includeArchivedRequirements: parsedQuery.data.includeArchivedRequirements }
	);

	if (!result.ok) {
		if (result.error.code === 'NOT_FOUND') {
			return json({ ok: false, message: 'Task not found' }, { status: 404 });
		}
		return json(validationFailure('Invalid request', result.error.fieldErrors), { status: 400 });
	}

	return json(
		{
			ok: true,
			task: result.data.task,
			requirements: result.data.implementsRequirements
		},
		{ status: 200 }
	);
}

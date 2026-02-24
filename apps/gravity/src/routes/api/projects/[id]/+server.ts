import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { updateProject } from '$lib/server/projects/project.server';
import { getProjectDetail } from '$lib/server/projects/projectDetail.server';
import {
	ProjectDetailParamsSchema,
	ProjectDetailQuerySchema,
	invalidRequestFromZod
} from '$lib/validation/projectDetail';

const ws = (url: URL) => url.searchParams.get('workspaceId') ?? 'ws_demo';

export async function GET({ url, params }: { url: URL; params: { id: string } }) {
	const queryParsed = ProjectDetailQuerySchema.safeParse({
		workspaceId: url.searchParams.get('workspaceId') ?? undefined,
		includeArchivedTasks: url.searchParams.get('includeArchivedTasks') ?? undefined
	});

	if (!queryParsed.success) {
		return json(invalidRequestFromZod(queryParsed.error), { status: 400 });
	}

	const paramsParsed = ProjectDetailParamsSchema.safeParse({ projectId: params.id });
	if (!paramsParsed.success) {
		return json(invalidRequestFromZod(paramsParsed.error), { status: 400 });
	}

	const res = await getProjectDetail(prisma, queryParsed.data.workspaceId, paramsParsed.data.projectId, {
		includeArchivedTasks: queryParsed.data.includeArchivedTasks
	});

	if (!res.ok) {
		return json(
			{ ok: false, message: res.error.message, fieldErrors: res.error.fieldErrors },
			{ status: res.error.code === 'NOT_FOUND' ? 404 : 400 }
		);
	}

	return json({ ok: true, project: res.data.project, tasks: res.data.tasks }, { status: 200 });
}

export async function PATCH({
	request,
	url,
	params
}: {
	request: Request;
	url: URL;
	params: { id: string };
}) {
	try {
		const input = await request.json().catch(() => ({}));
		const res = await updateProject(prisma, ws(url), params.id, input);

		if (!res.ok) {
			return json(
				{ ok: false, message: res.error.message, fieldErrors: res.error.fieldErrors },
				{ status: res.error.code === 'NOT_FOUND' ? 404 : 400 }
			);
		}

		return json({ ok: true, id: res.data.id }, { status: 200 });
	} catch (error) {
		console.error('[PATCH /api/projects/:id] unexpected error', error);
		return json(
			{ ok: false, message: 'Unable to save changes. Please try again.' },
			{ status: 500 }
		);
	}
}

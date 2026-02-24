import { json } from '@sveltejs/kit';
import type { ProjectStatus } from '$lib/generated/prisma/client';
import { listProjects, decodeProjectListCursor } from '$lib/server/projects/projectList.server';
import { createProject } from '$lib/server/projects/project.server';
import { prisma } from '$lib/server/prisma';
import {
	ProjectListQuerySchema,
	parseDateBound,
	zodIssuesToFieldErrors
} from '$lib/validation/projectList';

const ws = (url: URL) => url.searchParams.get('workspaceId') ?? 'ws_demo';

export async function GET({ url }: { url: URL }) {
	const queryInput = {
		workspaceId: url.searchParams.get('workspaceId') ?? 'ws_demo',
		status: url.searchParams.getAll('status'),
		ownerId: url.searchParams.get('ownerId') ?? undefined,
		dueFrom: url.searchParams.get('dueFrom') ?? undefined,
		dueTo: url.searchParams.get('dueTo') ?? undefined,
		includeArchived: url.searchParams.get('includeArchived') ?? undefined,
		sort: url.searchParams.get('sort') ?? undefined,
		limit: url.searchParams.get('limit') ?? undefined,
		cursor: url.searchParams.get('cursor') ?? undefined
	};

	const parsed = ProjectListQuerySchema.safeParse(queryInput);
	if (!parsed.success) {
		return json(
			{
				ok: false,
				message: 'Please fix the highlighted fields.',
				fieldErrors: zodIssuesToFieldErrors(parsed.error)
			},
			{ status: 400 }
		);
	}

	const cursor = decodeProjectListCursor(parsed.data.cursor);
	if (parsed.data.cursor && !cursor) {
		return json(
			{
				ok: false,
				message: 'Please fix the highlighted fields.',
				fieldErrors: { cursor: 'Invalid cursor' }
			},
			{ status: 400 }
		);
	}

	const result = await listProjects(prisma, parsed.data.workspaceId, {
		status: parsed.data.status as ProjectStatus[] | undefined,
		ownerId: parsed.data.ownerId,
		dueFrom: parsed.data.dueFrom ? parseDateBound(parsed.data.dueFrom, 'start') : undefined,
		dueTo: parsed.data.dueTo ? parseDateBound(parsed.data.dueTo, 'end') : undefined,
		includeArchived: parsed.data.includeArchived,
		limit: parsed.data.limit,
		cursor,
		sort: { field: 'updatedAt', direction: 'desc' }
	});

	return json({ ok: true, ...result }, { status: 200 });
}

export async function POST({ request, url }: { request: Request; url: URL }) {
	try {
		const input = await request.json().catch(() => ({}));
		const res = await createProject(prisma, ws(url), input);

		if (!res.ok) {
			return json(
				{ ok: false, message: res.error.message, fieldErrors: res.error.fieldErrors },
				{ status: 400 }
			);
		}

		return json({ ok: true, id: res.data.id }, { status: 200 });
	} catch (error) {
		console.error('[POST /api/projects] unexpected error', error);
		return json(
			{ ok: false, message: 'Unable to create project. Please try again.' },
			{ status: 500 }
		);
	}
}

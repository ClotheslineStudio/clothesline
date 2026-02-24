import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { archiveProject } from '$lib/server/projects/project.server';

const ws = (url: URL) => url.searchParams.get('workspaceId') ?? 'ws_demo';

export async function POST({ url, params }: { url: URL; params: { id: string } }) {
	const res = await archiveProject(prisma, ws(url), params.id);

	if (!res.ok) {
		return json(
			{ ok: false, message: res.error.message, fieldErrors: res.error.fieldErrors },
			{ status: res.error.code === 'NOT_FOUND' ? 404 : 400 }
		);
	}

	return json({ ok: true, id: res.data.id }, { status: 200 });
}

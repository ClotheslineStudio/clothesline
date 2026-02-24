import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { archiveTask } from '$lib/server/tasks/task.server';

const ws = (url: URL) => url.searchParams.get('workspaceId') ?? 'ws_demo';

export async function POST({ url, params }: { url: URL; params: { id: string } }) {
	const res = await archiveTask(prisma, ws(url), params.id);

	if (!res.ok) {
		return json(
			{ ok: false, message: res.error.message, fieldErrors: res.error.fieldErrors },
			{ status: res.error.code === 'NOT_FOUND' ? 404 : 400 }
		);
	}

	return json({ ok: true }, { status: 200 });
}

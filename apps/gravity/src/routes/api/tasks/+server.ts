import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { createTask } from '$lib/server/tasks/task.server';

const ws = (url: URL) => url.searchParams.get('workspaceId') ?? 'ws_demo';

export async function POST({ request, url }: { request: Request; url: URL }) {
	try {
		const input = await request.json().catch(() => ({}));
		const res = await createTask(prisma, ws(url), input);

		if (!res.ok) {
			return json(
				{ ok: false, message: res.error.message, fieldErrors: res.error.fieldErrors },
				{ status: res.error.code === 'NOT_FOUND' ? 404 : 400 }
			);
		}

		return json({ ok: true, id: res.data.id }, { status: 200 });
	} catch (error) {
		console.error('[POST /api/tasks] unexpected error', error);
		return json({ ok: false, message: 'Unable to create task. Please try again.' }, { status: 500 });
	}
}

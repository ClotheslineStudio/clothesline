import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { updateTask } from '$lib/server/tasks/task.server';

const ws = (url: URL) => url.searchParams.get('workspaceId') ?? 'ws_demo';

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
		const res = await updateTask(prisma, ws(url), params.id, input);

		if (!res.ok) {
			return json(
				{ ok: false, message: res.error.message, fieldErrors: res.error.fieldErrors },
				{ status: res.error.code === 'NOT_FOUND' ? 404 : 400 }
			);
		}

		return json({ ok: true }, { status: 200 });
	} catch (error) {
		console.error('[PATCH /api/tasks/:id] unexpected error', error);
		return json(
			{ ok: false, message: 'Unable to save changes. Please try again.' },
			{ status: 500 }
		);
	}
}

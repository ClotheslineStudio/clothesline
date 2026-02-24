import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { createProject } from '$lib/server/projects/project.server';

const ws = (url: URL) => url.searchParams.get('workspaceId') ?? 'ws_demo';

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

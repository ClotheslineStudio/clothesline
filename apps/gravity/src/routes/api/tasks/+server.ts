import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { listTasks, decodeTaskListCursor } from '$lib/server/tasks/taskList.server';
import { parseTaskListQuery } from '$lib/validation/taskList';

export async function GET({ url }: { url: URL }) {
	const parsed = parseTaskListQuery(url.searchParams);
	if (!parsed.ok) {
		return json(
			{ ok: false, message: parsed.message, fieldErrors: parsed.fieldErrors },
			{ status: 400 }
		);
	}

	const q = parsed.data;
	const decodedCursor = q.cursor ? decodeTaskListCursor(q.cursor) : undefined;
	if (q.cursor && !decodedCursor) {
		return json(
			{ ok: false, message: 'Validation failed.', fieldErrors: { cursor: 'Invalid cursor' } },
			{ status: 400 }
		);
	}
	const cursor = decodedCursor ?? undefined;

	try {
		const res = await listTasks(prisma, q.workspaceId, {
			status: q.status,
			priority: q.priority,
			assigneeId: q.assigneeId,
			projectId: q.projectId,
			dueFrom: q.dueFrom,
			dueTo: q.dueTo,
			includeArchived: q.includeArchived,
			sort: q.sort,
			limit: q.limit,
			cursor
		});

		return json(res, { status: 200 });
	} catch (error) {
		console.error('[GET /api/tasks] unexpected error', error);
		return json(
			{ ok: false, message: 'Unable to list tasks. Please try again.' },
			{ status: 500 }
		);
	}
}

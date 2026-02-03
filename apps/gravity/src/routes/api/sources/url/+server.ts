import { prisma } from '$lib/server/prisma';
import { validateHttpUrl } from '$lib/validation/sources';

type ApiErrorCode = 'VALIDATION' | 'BAD_JSON' | 'DB';

function jsonError(status: number, code: ApiErrorCode, message: string) {
  return Response.json(
    {
      ok: false,
      error: { code, message }
    },
    { status }
  );
}

type PostBody = {
  workspaceId?: string;
  title?: string;
  url?: string;
};

export async function POST({ request }) {
  let body: PostBody;

  try {
    body = (await request.json()) as PostBody;
  } catch {
    return jsonError(400, 'BAD_JSON', 'Request body must be valid JSON.');
  }

  const workspaceId = (body.workspaceId ?? '').trim();
  const title = (body.title ?? '').trim();
  const urlInput = (body.url ?? '').trim();

  if (!workspaceId) {
    return jsonError(400, 'VALIDATION', 'workspaceId is required.');
  }

  // v1: title required
  if (!title) {
    return jsonError(400, 'VALIDATION', 'title is required for v1.');
  }

  const v = validateHttpUrl(urlInput);
  if (!v.ok) {
    return jsonError(400, 'VALIDATION', v.message);
  }

  try {
    const source = await prisma.source.create({
      data: {
        workspaceId,
        title,
        type: 'URL',
        url: v.normalized,

        // URL sources do not have file fields
        fileStorageKey: null,
        fileOriginalName: null,
        fileMimeType: null,
        fileSizeBytes: null,

        notes: null
      }
    });

    return Response.json({ ok: true, source }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/sources/url] db create failed', err);
    return jsonError(500, 'DB', 'Failed to create Source.');
  }
}


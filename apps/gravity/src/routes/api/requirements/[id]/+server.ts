import { prisma } from '$lib/server/prisma';
import { ok, badRequest } from '$lib/server/http';
import { updateRequirement } from '$lib/server/requirements/requirement.server';

const ws = (url: URL) => url.searchParams.get('workspaceId') ?? 'ws_demo';

export async function PATCH({ request, url, params }) {
  const body = await request.json().catch(() => ({}));

  // URL param wins
  const input = { ...body, id: params.id };

  const res = await updateRequirement(prisma, ws(url), input);

  if (!res.ok) return badRequest(res.error);

  return ok({ id: res.data.id }, 200);
}

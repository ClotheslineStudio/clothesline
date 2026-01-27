import { prisma } from '$lib/server/prisma';
import { ok, badRequest } from '$lib/server/http';
import { archiveRequirement } from '$lib/server/requirements/requirement.server';

const ws = (url: URL) => url.searchParams.get('workspaceId') ?? 'ws_demo';

export async function POST({ url, params }) {
  const res = await archiveRequirement(prisma, ws(url), params.id);

  if (!res.ok) return badRequest(res.error);

  return ok({ id: res.data.id }, 200);
}

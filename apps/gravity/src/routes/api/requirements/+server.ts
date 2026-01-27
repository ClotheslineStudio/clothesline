import { prisma } from '$lib/server/prisma';
import { ok, badRequest } from '$lib/server/http';
import { createRequirement } from '$lib/server/requirements/requirement.server';

const ws = (url: URL) => url.searchParams.get('workspaceId') ?? 'ws_demo';

export async function POST({ request, url }) {
  const input = await request.json().catch(() => ({}));

  const res = await createRequirement(prisma, ws(url), input);

  if (!res.ok) return badRequest(res.error);

  // if you prefer 201 for create, change 200 -> 201
  return ok({ id: res.data.id }, 200);
}


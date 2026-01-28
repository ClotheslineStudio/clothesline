import { prisma } from '$lib/server/prisma';
import { ok, badRequest } from '$lib/server/http';
import { createRequirement } from '$lib/server/requirements/requirement.server';
import { listRequirements } from '$lib/server/requirements/requirement.list';

const ws = (url: URL) => url.searchParams.get('workspaceId') ?? 'ws_demo';

export async function GET({ url }: { url: URL }) {
  const workspaceId = ws(url);

  // Convert URLSearchParams -> object, ignoring workspaceId
  const raw = Object.fromEntries(
    Array.from(url.searchParams.entries()).filter(([k]) => k !== 'workspaceId')
  ) as Record<string, string>;

  const res = await listRequirements(prisma, workspaceId, raw);
  if (!res.ok) return badRequest(res.error);

  return ok(res.data, 200);
}

export async function POST({ request, url }: { request: Request; url: URL }) {
  const input = await request.json().catch(() => ({}));
  const res = await createRequirement(prisma, ws(url), input);

  if (!res.ok) return badRequest(res.error);

  return ok({ id: res.data.id }, 200);
}




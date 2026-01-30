import { prisma } from '$lib/server/prisma';
import { ok, badRequest } from '$lib/server/http';
import { linkRequirementToSourceDerivedFrom } from '$lib/server/requirements/requirement.derivedFrom';

const ws = (url: URL) => url.searchParams.get('workspaceId') ?? 'ws_demo';

export async function POST({ request, url, params }: { request: Request; url: URL; params: { id: string } }) {
  const body = await request.json().catch(() => ({}));

  const res = await linkRequirementToSourceDerivedFrom(prisma, ws(url), params.id, body);

  if (!res.ok) {
    const status = res.error.code === 'NOT_FOUND' ? 404 : 400;
    return badRequest(res.error, status);
  }

  return ok(res.data, 200);
}

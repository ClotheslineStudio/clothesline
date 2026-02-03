import { prisma } from '$lib/server/prisma';
import { ok, badRequest } from '$lib/server/http';
import { getRequirementRelated } from '$lib/server/requirements/requirement.related';

const ws = (url: URL) => url.searchParams.get('workspaceId') ?? 'ws_demo';

export async function GET({ url, params }: { url: URL; params: { id: string } }) {
  const res = await getRequirementRelated(prisma, ws(url), params.id);

  if (!res.ok) {
    const status = res.error.code === 'NOT_FOUND' ? 404 : 400;
    return badRequest(res.error, status);
  }

  return ok(res.data, 200);
}

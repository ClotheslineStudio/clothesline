import { prisma } from '$lib/server/prisma';
import { ok, badRequest } from '$lib/server/http';

import { updateRequirement } from '$lib/server/requirements/requirement.server';
import { getRequirementDetail } from '$lib/server/requirements/requirement.detail';

const ws = (url: URL) => url.searchParams.get('workspaceId') ?? 'ws_demo';

export async function GET({ url, params }: { url: URL; params: { id: string } }) {
  const res = await getRequirementDetail(prisma, ws(url), params.id);

  if (!res.ok) {
    const status = res.error.code === 'NOT_FOUND' ? 404 : 400;
    return badRequest(res.error, status);
  }

  return ok({ item: res.data }, 200);
}

export async function PATCH({
  request,
  url,
  params
}: {
  request: Request;
  url: URL;
  params: { id: string };
}) {
  const body = await request.json().catch(() => ({}));
  const input = { ...body, id: params.id };

  const res = await updateRequirement(prisma, ws(url), input);

  if (!res.ok) return badRequest(res.error);

  return ok({ id: res.data.id }, 200);
}

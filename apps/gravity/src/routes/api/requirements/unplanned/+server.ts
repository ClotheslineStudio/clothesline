import { prisma } from '$lib/server/prisma';
import { ok, badRequest } from '$lib/server/http';
import { getUnplannedRequirements } from '$lib/server/requirements/requirement.unplanned';

export async function GET({ url }: { url: URL }) {
  const res = await getUnplannedRequirements(prisma, url);

  if (!res.ok) {
    return badRequest(res.error, 400);
  }

  return ok(res.data, 200);
}

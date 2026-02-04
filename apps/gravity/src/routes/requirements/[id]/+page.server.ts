import { error } from '@sveltejs/kit';

import { prisma } from '$lib/server/prisma';
import { getRequirementDetailPageData } from '$lib/server/requirements/requirement.detail';

export const load = async ({ params, url }) => {
  const workspaceId = url.searchParams.get('workspaceId') ?? 'ws_demo';

  const result = await getRequirementDetailPageData(prisma, workspaceId, params.id);

  if (!result.ok) {
    const status =
      typeof ((result.error as unknown) as { status?: number })?.status === 'number'
        ? ((result.error as unknown) as { status: number }).status
        : 404;
    throw error(status, result.error.message);
  }

  return { workspaceId, requirement: result.data };
};

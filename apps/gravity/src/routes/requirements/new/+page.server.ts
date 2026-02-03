import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const workspaceId = url.searchParams.get('workspaceId') ?? 'ws_demo';
  return { workspaceId };
};

import { error } from '@sveltejs/kit';

export const load = async ({ fetch, params, url }) => {
  const workspaceId = (url.searchParams.get('workspaceId') ?? '').trim();
  if (!workspaceId) throw error(400, 'workspaceId is required');

  const res = await fetch(
    `/api/sources/${encodeURIComponent(params.id)}?workspaceId=${encodeURIComponent(workspaceId)}`
  );

  if (res.status === 404) throw error(404, 'Source not found');
  if (!res.ok) throw error(res.status, await res.text());

  const source = await res.json();
  return { source, workspaceId };
};

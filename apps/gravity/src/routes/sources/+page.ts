import type { PageLoad } from './$types';

type SourceType = 'PDF' | 'URL';

type Source = {
  id: string;
  workspaceId: string;
  title: string;
  type: SourceType;
  url: string | null;

  fileStorageKey: string | null;
  fileOriginalName: string | null;
  fileMimeType: string | null;
  fileSizeBytes: number | null;

  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

type SourcesResponse = {
  workspaceId: string;
  count: number;
  limit: number;
  type: SourceType | null;
  sources: Source[];
};

function isSourceType(v: string | null): v is SourceType {
  return v === 'PDF' || v === 'URL';
}

export const load: PageLoad = ({ fetch, url }) => {
  const workspaceId = (url.searchParams.get('workspaceId') ?? 'ws_demo').trim();
  const limitRaw = Number(url.searchParams.get('limit') ?? 50);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 200) : 50;

  const typeParam = url.searchParams.get('type');
  const type = isSourceType(typeParam) ? typeParam : null;

  const qs = new URLSearchParams({ workspaceId, limit: String(limit) });
  if (type) qs.set('type', type);

  const sources = fetch(`/api/sources?${qs.toString()}`).then(async (res) => {
    if (!res.ok) throw new Error(await res.text());
    return (await res.json()) as SourcesResponse;
  });

  return { workspaceId, limit, type, sources };
};

import type { PageServerLoad } from './$types';

type OwnerMini = { id: string; name?: string | null; email?: string | null };

export type RequirementListItem = {
  id: string;
  title: string;
  status: string;
  priority: string;
  ownerId: string | null;
  owner?: OwnerMini | null;
  dueDate: string | null;
  createdAt: string;
};

type ApiOk = {
  ok: true;
  items: RequirementListItem[];
  limit?: number;
  offset?: number;
  nextOffset?: number | null;
};

type ApiErr = {
  error?: { message?: string };
};

function sp(url: URL, key: string): string | null {
  const v = url.searchParams.get(key);
  if (!v) return null;
  const t = v.trim();
  return t.length ? t : null;
}

async function safeJson(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export const load: PageServerLoad = async ({ fetch, url }) => {
  const workspaceId = sp(url, 'workspaceId') ?? 'ws_demo';

  // view=needs-planning (optional)
  const view = sp(url, 'view');

  const status = sp(url, 'status');
  const priority = sp(url, 'priority');
  const ownerId = sp(url, 'ownerId');

  const dueAfter = sp(url, 'dueAfter');
  const dueBefore = sp(url, 'dueBefore');

  const limit = sp(url, 'limit') ?? '50';
  const offset = sp(url, 'offset') ?? '0';

  const qs = new URLSearchParams();
  qs.set('workspaceId', workspaceId);
  if (view) qs.set('view', view);

  if (status) qs.set('status', status);
  if (priority) qs.set('priority', priority);
  if (ownerId) qs.set('ownerId', ownerId);
  if (dueAfter) qs.set('dueAfter', dueAfter);
  if (dueBefore) qs.set('dueBefore', dueBefore);

  qs.set('limit', limit);
  qs.set('offset', offset);

  const res = await fetch(`/api/requirements?${qs.toString()}`);
  const body = await safeJson(res);

  // If API returned non-JSON, don’t crash the page — show an error message instead.
  if (!body) {
    return {
      workspaceId,
      view,
      items: [] as RequirementListItem[],
      error: `Requirements API did not return JSON (status ${res.status}).`,
      limit: Number(limit),
      offset: Number(offset),
      nextOffset: null as number | null,
      filters: { status, priority, ownerId, dueAfter, dueBefore }
    };
  }

  if (!res.ok) {
    const msg = (body as ApiErr)?.error?.message ?? 'Failed to load requirements.';
    return {
      workspaceId,
      view,
      items: [] as RequirementListItem[],
      error: msg,
      limit: Number(limit),
      offset: Number(offset),
      nextOffset: null as number | null,
      filters: { status, priority, ownerId, dueAfter, dueBefore }
    };
  }

  const ok = body as ApiOk;

  return {
    workspaceId,
    view,
    items: ok.items ?? [],
    error: null as string | null,
    limit: ok.limit ?? Number(limit),
    offset: ok.offset ?? Number(offset),
    nextOffset: ok.nextOffset ?? null,
    filters: { status, priority, ownerId, dueAfter, dueBefore }
  };
};



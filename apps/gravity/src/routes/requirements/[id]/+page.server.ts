import { error, fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { getRequirementDetailPageData } from '$lib/server/requirements/requirement.detail';

function asStringArray(values: FormDataEntryValue[]) {
  return values
    .filter((v): v is string => typeof v === 'string')
    .map((s) => s.trim())
    .filter(Boolean);
}

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

  const linkedSourceIds = new Set((result.data.sources ?? []).map((s: { id: string }) => s.id));

  // Fetch workspace sources for picker (hide already linked)
  const allSources = await prisma.source.findMany({
    where: { workspaceId },
    select: { id: true, title: true, type: true, url: true, createdAt: true },
    orderBy: { createdAt: 'desc' }
  });

  const availableSources = allSources.filter((s) => !linkedSourceIds.has(s.id));

  return { workspaceId, requirement: result.data, availableSources };
};



export const actions = {
  linkSources: async ({ request, params, url }) => {
    const workspaceId = url.searchParams.get('workspaceId') ?? 'ws_demo';
    const form = await request.formData();

    const sourceIds = asStringArray(form.getAll('sourceIds'));

    if (sourceIds.length === 0) {
      return fail(400, { ok: false, message: 'Select at least one Source to link.' });
    }

    // Dedupe: check which are already linked
    const existing = await prisma.edge.findMany({
      where: {
        workspaceId,
        type: 'DERIVED_FROM',
        fromType: 'REQUIREMENT',
        fromId: params.id,
        toType: 'SOURCE',
        toId: { in: sourceIds }
      },
      select: { toId: true }
    });

    const already = new Set(existing.map((e) => e.toId));
    const toCreate = sourceIds.filter((id) => !already.has(id));

    if (toCreate.length === 0) {
      return fail(409, { ok: false, message: 'Those Sources are already linked.' });
    }

    // Create edges (unique constraint + skipDuplicates gives safety)
    await prisma.edge.createMany({
      data: toCreate.map((sourceId) => ({
        workspaceId,
        type: 'DERIVED_FROM',
        fromType: 'REQUIREMENT',
        fromId: params.id,
        toType: 'SOURCE',
        toId: sourceId
      })),
      skipDuplicates: true
    });

    return { ok: true, added: toCreate.length };
  }
};


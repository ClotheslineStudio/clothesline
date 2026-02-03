import { error, fail, redirect } from '@sveltejs/kit';
import type { Prisma } from '$lib/generated/prisma/client';

import { getRequirementDetail } from '$lib/server/requirements/requirement.detail';
import { UpdateRequirementSchema, normalizeDueDate } from '$lib/validation/requirements';

// ✅ Replace with your actual prisma singleton import (match create route)
import { prisma } from '$lib/server/prisma';

function formDataToObject(fd: FormData) {
  const obj: Record<string, unknown> = {};
  for (const [k, v] of fd.entries()) obj[k] = v;
  return obj;
}

export const load = async ({ params, url }) => {
  const workspaceId = url.searchParams.get('workspaceId') ?? 'ws_demo';

  const result = await getRequirementDetail(prisma, workspaceId, params.id);

  if (!result.ok) {
    const status =
      typeof ((result.error as unknown) as { status?: number })?.status === 'number'
        ? ((result.error as unknown) as { status: number }).status
        : 404;
    throw error(status, result.error.message);
  }

  return { workspaceId, requirement: result.data };
};

export const actions = {
  update: async ({ request, params, url }) => {
    const workspaceId = url.searchParams.get('workspaceId') ?? 'ws_demo';

    const raw = formDataToObject(await request.formData());

    // IMPORTANT: Update schema expects { id, ...patchFields }
    const parsed = UpdateRequirementSchema.safeParse({
      id: params.id,
      ...raw
    });

    if (!parsed.success) {
      return fail(400, {
        ok: false,
        message: 'Please fix the highlighted fields.',
        formError: parsed.error.flatten().formErrors?.[0],
        fieldErrors: parsed.error.flatten().fieldErrors,
        values: raw
      });
    }

    const patch = parsed.data;

    // Build Prisma update payload with “only provided fields”
    const data: Prisma.RequirementUncheckedUpdateManyInput = {};


    if (patch.title !== undefined) data.title = patch.title;
    if (patch.body !== undefined) data.body = patch.body; // string | null
    if (patch.status !== undefined) data.status = patch.status;
    if (patch.priority !== undefined) data.priority = patch.priority;
    if (patch.ownerId !== undefined) {
      data.ownerId = patch.ownerId ? patch.ownerId : null;
    }

    if (patch.dueDate !== undefined) {
      const normalized = normalizeDueDate(patch.dueDate);
      // normalized can be undefined (invalid), null (clear), or Date (set)
      if (normalized === undefined) {
        return fail(400, {
          ok: false,
          message: 'Please fix the highlighted fields.',
          fieldErrors: { dueDate: ['Invalid date format'] },
          values: raw
        });
      }
      data.dueDate = normalized;
    }

    try {
      const updated = await prisma.requirement.updateMany({
        where: { id: params.id, workspaceId },
        data
      });

      if (updated.count === 0) {
        return fail(404, { ok: false, message: 'Requirement not found.' });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Update failed. Please try again.';
      return fail(500, { ok: false, message });
    }

    // “Reflected immediately” = redirect back to detail
    throw redirect(303, `/requirements/${params.id}?workspaceId=${workspaceId}&updated=1`);
  }
};


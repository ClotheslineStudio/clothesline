// src/lib/server/requirements/requirement.service.ts
import type { PrismaClient } from '$lib/generated/prisma/client';
import type { ZodError } from 'zod';

import type { AppError } from '$lib/validation/appError';
import { notFoundError, validationError } from '$lib/validation/appError';
import {
  CreateRequirementSchema,
  UpdateRequirementSchema,
  normalizeDueDate
} from '$lib/validation/requirements';

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; error: AppError };
type Result<T> = Ok<T> | Err;

function toFieldErrors(zodError: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  const issues = zodError.issues ?? [];
  for (const i of issues) {
    const key = Array.isArray(i.path) && i.path.length ? String(i.path[0]) : 'form';
    if (!out[key]) out[key] = i.message;
  }
  return out;
}

export async function createRequirement(
  prisma: PrismaClient,
  workspaceId: string,
  input: unknown
): Promise<Result<{ id: string }>> {
  const parsed = CreateRequirementSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: validationError('Validation failed.', toFieldErrors(parsed.error))
    };
  }

  const v = parsed.data;

  const dueDate = normalizeDueDate(v.dueDate);
  if (v.dueDate && !dueDate) {
    return {
      ok: false,
      error: validationError('Validation failed.', { dueDate: 'Invalid date format' })
    };
  }

  const created = await prisma.requirement.create({
    data: {
      workspaceId,
      title: v.title,
      body: v.body,
      status: v.status,
      priority: v.priority,
      ownerId: v.ownerId,
      dueDate
    },
    select: { id: true }
  });

  return { ok: true, data: created };
}

export async function updateRequirement(
  prisma: PrismaClient,
  workspaceId: string,
  input: unknown
): Promise<Result<{ id: string }>> {
  const parsed = UpdateRequirementSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: validationError('Validation failed.', toFieldErrors(parsed.error))
    };
  }

  const v = parsed.data;

  const dueDate = normalizeDueDate(v.dueDate);
  if (v.dueDate && !dueDate) {
    return {
      ok: false,
      error: validationError('Validation failed.', { dueDate: 'Invalid date format' })
    };
  }

  // updateMany enforces workspace scoping and avoids throwing if record missing
  const result = await prisma.requirement.updateMany({
    where: { id: v.id, workspaceId, archivedAt: null },
    data: {
      title: v.title,
      body: v.body,
      status: v.status,
      priority: v.priority,
      ownerId: v.ownerId,
      dueDate
    }
  });

  if (result.count === 0) {
    return { ok: false, error: notFoundError('Requirement not found (or archived).') };
  }

  return { ok: true, data: { id: v.id } };
}

export async function archiveRequirement(
  prisma: PrismaClient,
  workspaceId: string,
  id: string
): Promise<Result<{ id: string }>> {
  if (!id) {
    return {
      ok: false,
      error: validationError('Validation failed.', { id: 'Missing requirement id' })
    };
  }

  const result = await prisma.requirement.updateMany({
    where: { id, workspaceId, archivedAt: null },
    data: { archivedAt: new Date() }
  });

  if (result.count === 0) {
    return { ok: false, error: notFoundError('Requirement not found (or already archived).') };
  }

  return { ok: true, data: { id } };
}

import type { EdgeType, EntityType } from '$lib/generated/prisma/client';
import { allowedRelationships } from './allowedRelationships';

export type ValidateEdgeInput = {
  type: EdgeType;
  fromType: EntityType;
  toType: EntityType;
  fromId?: string;
  toId?: string;
};

export type ValidateEdgeResult =
  | { ok: true }
  | {
      ok: false;
      code: 'EDGE_NOT_ALLOWED' | 'EDGE_SELF_LINK';
      message: string;
    };

export function validateEdge(input: ValidateEdgeInput): ValidateEdgeResult {
  const { type, fromType, toType, fromId, toId } = input;

  // basic safety: prevent self-links when ids are provided
  if (fromId && toId && fromId === toId) {
    return {
      ok: false,
      code: 'EDGE_SELF_LINK',
      message: `Invalid edge: fromId and toId cannot be the same (${fromId}).`
    };
  }

  const allowedPairs = allowedRelationships[type] ?? [];

  const allowed = allowedPairs.some(
    (p) => p.fromType === fromType && p.toType === toType
  );

  if (!allowed) {
    const allowedText =
      allowedPairs.length === 0
        ? '(no pairs configured)'
        : allowedPairs.map((p) => `${p.fromType} → ${p.toType}`).join(', ');

    return {
      ok: false,
      code: 'EDGE_NOT_ALLOWED',
      message: `Invalid edge: ${fromType} → ${toType} is not allowed for ${type}. Allowed: ${allowedText}`
    };
  }

  return { ok: true };
}

export function assertValidEdge(input: ValidateEdgeInput): void {
  const res = validateEdge(input);
  if (!res.ok) throw new Error(res.message);
}

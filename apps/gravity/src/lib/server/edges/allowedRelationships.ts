import type { EdgeType, EntityType } from '$lib/generated/prisma/client';

type Pair = { fromType: EntityType; toType: EntityType };

/**
 * Single source of truth for which relationships are allowed.
 * Key: EdgeType
 * Value: allowed from/to type pairs
 */
export const allowedRelationships: Record<EdgeType, Pair[]> = {
  DERIVED_FROM: [{ fromType: 'REQUIREMENT', toType: 'SOURCE' }],

  IMPLEMENTS: [{ fromType: 'TASK', toType: 'REQUIREMENT' }],

  DOCUMENTS: [{ fromType: 'PAGE', toType: 'REQUIREMENT' }],

  PROVIDES_EVIDENCE_FOR: [{ fromType: 'EVIDENCE', toType: 'REQUIREMENT' }],

  ATTACHED_TO: [
    { fromType: 'EVIDENCE', toType: 'TASK' },
    { fromType: 'EVIDENCE', toType: 'PAGE' }
  ],

  PART_OF: [{ fromType: 'TASK', toType: 'PROJECT' }],

  DEPENDS_ON: [{ fromType: 'TASK', toType: 'TASK' }],

  // optional rule
  CITES: [{ fromType: 'PAGE', toType: 'SOURCE' }],

  // generic escape hatch (tighten later if desired)
  RELATED_TO: [
    { fromType: 'SOURCE', toType: 'SOURCE' },
    { fromType: 'SOURCE', toType: 'REQUIREMENT' },
    { fromType: 'REQUIREMENT', toType: 'REQUIREMENT' },
    { fromType: 'TASK', toType: 'TASK' },
    { fromType: 'PAGE', toType: 'PAGE' },
    { fromType: 'EVIDENCE', toType: 'EVIDENCE' }
  ],

  // legacy: treat as equivalent to PROVIDES_EVIDENCE_FOR for now
  EVIDENCE_FOR: [{ fromType: 'EVIDENCE', toType: 'REQUIREMENT' }]
};

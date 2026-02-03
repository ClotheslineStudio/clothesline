import { z } from 'zod';
import { RequirementPrioritySchema, RequirementStatusSchema } from '$lib/validation/requirements';

const BoolParam = z
  .string()
  .optional()
  .default('false')
  .transform((v) => v === 'true' || v === '1');

const CsvEnumList = (allowed: readonly string[]) =>
  z
    .string()
    .optional()
    .transform((v) => {
      if (!v) return undefined;
      const parts = v
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      return parts.length ? parts : undefined;
    })
    .refine((arr) => {
      if (!arr) return true;
      return arr.every((x) => allowed.includes(x));
    }, 'Invalid filter value');

const DateParam = z
  .string()
  .optional()
  .transform((v) => (v && v.trim() !== '' ? v.trim() : undefined))
  .refine((v) => {
    if (!v) return true;
    const isYMD = /^\d{4}-\d{2}-\d{2}$/.test(v);
    if (isYMD) return true;
    const d = new Date(v);
    return !Number.isNaN(d.getTime());
  }, 'Invalid date format');

export const RequirementListQuerySchema = z.object({
  status: CsvEnumList(RequirementStatusSchema.options),
  priority: CsvEnumList(RequirementPrioritySchema.options),
  ownerId: z.string().optional().transform((v) => (v?.trim() ? v.trim() : undefined)),

  dueAfter: DateParam,
  dueBefore: DateParam,

  includeArchived: BoolParam,

  sort: z.enum(['createdAt', 'dueDate', 'priority', 'status']).optional().default('createdAt'),
  dir: z.enum(['asc', 'desc']).optional().default('desc'),

  limit: z.coerce.number().int().min(1).max(200).optional().default(50),
  offset: z.coerce.number().int().min(0).max(5000).optional().default(0)
});

export type RequirementListQuery = z.infer<typeof RequirementListQuerySchema>;

export function normalizeQueryDate(input?: string): Date | undefined {
  if (!input) return undefined;

  const isYMD = /^\d{4}-\d{2}-\d{2}$/.test(input);
  if (isYMD) {
    // stable in all timezones
    const d = new Date(`${input}T12:00:00.000Z`);
    return Number.isNaN(d.getTime()) ? undefined : d;
  }

  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

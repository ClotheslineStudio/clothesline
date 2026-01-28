import { z } from 'zod';

export const RequirementStatusSchema = z.enum(['DRAFT', 'ACTIVE', 'BLOCKED', 'DONE']);
export const RequirementPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);

// For CREATE: '' should mean “not provided” => undefined
const OptionalString = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v === '' ? undefined : v));

// For UPDATE: '' should mean “clear it” => null
const OptionalStringOrNull = z
  .string()
  .trim()
  .optional()
  .transform((v) => {
    if (v === undefined) return undefined; // field not provided
    if (v === '') return null; // explicit clear
    return v;
  });

const DueDateInput = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v === '' ? undefined : v))
  .refine(
    (v) => {
      if (!v) return true;
      return /^\d{4}-\d{2}-\d{2}$/.test(v) || !Number.isNaN(new Date(v).getTime());
    },
    { message: 'Invalid date format' }
  );

const DueDateInputOrNull = z
  .string()
  .trim()
  .optional()
  .transform((v) => {
    if (v === undefined) return undefined;
    if (v === '') return null;
    return v;
  })
  .refine(
    (v) => {
      if (v === undefined || v === null) return true;
      return /^\d{4}-\d{2}-\d{2}$/.test(v) || !Number.isNaN(new Date(v).getTime());
    },
    { message: 'Invalid date format' }
  );

export const CreateRequirementSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  body: OptionalString,
  status: RequirementStatusSchema.default('DRAFT'),
  priority: RequirementPrioritySchema.default('MEDIUM'),
  ownerId: OptionalString,
  dueDate: DueDateInput
});

// PATCH-friendly update schema:
// - id required
// - all other fields optional
// - '' clears to null for body/ownerId/dueDate (via *OrNull transforms)
export const UpdateRequirementSchema = z
  .object({
    id: z.string().min(1, 'Missing requirement id'),
    title: z.string().trim().min(1, 'Title is required').optional(),
    body: OptionalStringOrNull.optional(),
    status: RequirementStatusSchema.optional(),
    priority: RequirementPrioritySchema.optional(),
    ownerId: OptionalStringOrNull.optional(),
    dueDate: DueDateInputOrNull.optional()
  })
  .refine(
    (v) =>
      v.title !== undefined ||
      v.body !== undefined ||
      v.status !== undefined ||
      v.priority !== undefined ||
      v.ownerId !== undefined ||
      v.dueDate !== undefined,
    { message: 'No fields provided to update.' }
  );

// Normalize: accepts string | null | undefined
// - undefined => don’t touch
// - null => clear
// - YYYY-MM-DD => noon UTC
// - ISO datetime => Date
export function normalizeDueDate(
  input: string | null | undefined
): Date | null | undefined {
  if (input === undefined) return undefined;
  if (input === null) return null;

  const isYMD = /^\d{4}-\d{2}-\d{2}$/.test(input);
  if (isYMD) {
    const d = new Date(`${input}T12:00:00.000Z`);
    return Number.isNaN(d.getTime()) ? undefined : d;
  }

  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

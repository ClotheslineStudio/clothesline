import { z } from 'zod';

export const LinkDerivedFromSchema = z.object({
  sourceId: z.string().trim().min(1, 'sourceId is required')
});

export type LinkDerivedFromInput = z.infer<typeof LinkDerivedFromSchema>;

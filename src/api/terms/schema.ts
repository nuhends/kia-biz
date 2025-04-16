import { z } from 'zod';

export const TermsClassIDSchema = z.enum(['JOIN_SERVICE_USE']);
export type TermsClassID = z.infer<typeof TermsClassIDSchema>;

export const TermSchema = z.object({
  termsName: z.string(),
  termsVersion: z.number(),
  startDate: z.number(),
  endDate: z.number(),
  contents: z.string(),
});
export type Term = z.infer<typeof TermSchema>;

export const TermsResponseSchema = z.record(TermsClassIDSchema, z.array(TermSchema));
export type TermsResponse = z.infer<typeof TermsResponseSchema>;

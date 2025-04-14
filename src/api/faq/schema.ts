import { z } from 'zod';

export const TabTypeSchema = z.enum(['CONSULT', 'USAGE']);
export type TabType = z.infer<typeof TabTypeSchema>;

export const FaqCategorySchema = z.object({
  categoryID: z.string(),
  name: z.string(),
});
export type FaqCategory = z.infer<typeof FaqCategorySchema>;

export const FaqCategoriesResponseSchema = z.record(TabTypeSchema, z.array(FaqCategorySchema));
export type FaqCategoriesResponse = z.infer<typeof FaqCategoriesResponseSchema>;

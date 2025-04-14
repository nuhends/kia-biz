import { z } from 'zod';

export const TabTypeSchema = z.enum(['CONSULT', 'USAGE']);
export type TabType = z.infer<typeof TabTypeSchema>;

export const FaqCategoryIDSchema = z.enum([
  'PRODUCT',
  'COUNSELING',
  'CONTRACT',
  'SIGN_UP',
  'BUSINESS',
  'ACCIDENT',
  'RESERVATION',
  'VEHICLE',
  'REFUEL',
  'COUPON',
]);
export type FaqCategoryID = z.infer<typeof FaqCategoryIDSchema>;

export const FaqCategorySchema = z.object({
  categoryID: z.string(),
  name: z.string(),
});
export type FaqCategory = z.infer<typeof FaqCategorySchema>;

export const FaqCategoriesResponseSchema = z.record(TabTypeSchema, z.array(FaqCategorySchema));
export type FaqCategoriesResponse = z.infer<typeof FaqCategoriesResponseSchema>;

export const FaqSchema = z.object({
  id: z.number(),
  categoryID: FaqCategoryIDSchema,
  categoryName: z.string(),
  subCategoryName: z.string(),
  question: z.string(),
  answer: z.string(),
});
export type Faq = z.infer<typeof FaqSchema>;

export const FaqsResponseSchema = z.record(TabTypeSchema, z.array(FaqSchema));

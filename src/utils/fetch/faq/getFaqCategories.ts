import { apiRequest } from '@/src/utils/apiHelper';

import { FaqCategoriesResponseSchema } from './schema';

import type { FaqCategory, TabType } from './schema';

/**
 * 탭별 카테고리 목록 조회
 * @param params.tab 탭 유형
 * @returns 카테고리 목록
 */

interface GetFaqCategoriesParams {
  tab: string;
}

export async function getFaqCategories({ tab }: GetFaqCategoriesParams): Promise<FaqCategory[]> {
  try {
    const response = await apiRequest('/api/faq/categories', { tab }, FaqCategoriesResponseSchema);

    return response[tab as TabType] || [];
  } catch (error) {
    console.error('카테고리 API 오류:', error);
    throw error;
  }
}

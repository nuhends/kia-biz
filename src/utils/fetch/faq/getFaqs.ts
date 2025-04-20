import { ITEMS_PER_PAGE } from '@/src/screens/Faq/constants';
import { apiRequest } from '@/src/utils/apiHelper';

import { FaqListResponseSchema } from './schema';

import type { FaqListResponse } from './schema';

/**
 * 탭별 FAQ 목록 조회
 * @param params 매개변수 객체
 * @param params.tab 탭 유형 (CONSULT 또는 USAGE)
 * @param params.categoryID 카테고리 ID (선택적)
 * @param params.question 검색어 (선택적)
 * @param params.limit 한 페이지당 항목 수 (기본값: 10)
 * @param params.offset 시작 위치 (기본값: 0)
 * @returns FAQ 목록
 */

interface GetFaqsParams {
  tab: string;
  categoryID?: string;
  question?: string;
  limit?: number;
  offset?: number;
}

export async function getFaqs({
  tab,
  categoryID,
  question,
  limit = ITEMS_PER_PAGE,
  offset = 0,
}: GetFaqsParams): Promise<FaqListResponse> {
  try {
    return await apiRequest(
      '/api/faq/faqs',
      {
        tab,
        categoryID,
        question,
        limit,
        offset,
      },
      FaqListResponseSchema,
    );
  } catch (error) {
    console.error('FAQ API 오류:', error);
    throw error;
  }
}

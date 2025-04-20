import { z } from 'zod';

import { ITEMS_PER_PAGE } from '@/src/screens/Faq/constants';
import { createQueryParams, getApiUrl } from '@/src/utils/apiHelper';

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
    const queryParams = createQueryParams({
      tab,
      categoryID,
      question,
      limit,
      offset,
    });

    // 유틸리티 함수를 사용하여 API URL 생성
    const apiUrl = getApiUrl('/api/faq/faqs', queryParams);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('FAQ 데이터를 불러오는데 실패했습니다.');
    }

    const rawData = await response.json();
    const validatedData = FaqListResponseSchema.parse(rawData);
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('데이터 형식 오류:', error.errors);
      throw new Error('API 응답 데이터 형식이 올바르지 않습니다.');
    }
    console.error('FAQ API 오류:', error);
    throw error;
  }
}

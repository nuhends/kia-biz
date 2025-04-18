import { z } from 'zod';

import { getApiUrl } from '@/src/utils/api';

import { FaqCategoryID, FaqListResponse, FaqListResponseSchema, TabType } from './schema';

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
export async function getFaqs(params: {
  tab: string;
  categoryID?: string;
  question?: string;
  limit?: number;
  offset?: number;
}): Promise<FaqListResponse> {
  try {
    const { tab, categoryID, question, limit = 10, offset = 0 } = params;
    // 쿼리 파라미터 구성
    const queryParams = new URLSearchParams();
    queryParams.append('tab', tab);
    if (categoryID) {
      queryParams.append('categoryID', categoryID);
    }
    if (question) {
      queryParams.append('question', question);
    }
    queryParams.append('limit', limit.toString());
    queryParams.append('offset', offset.toString());

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

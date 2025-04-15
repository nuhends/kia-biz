import { z } from 'zod';

import { FaqCategoryID, FaqListResponse, FaqListResponseSchema, TabType } from './schema';

/**
 * 탭별 FAQ 목록 조회
 * @param tab 탭 유형 (CONSULT 또는 USAGE)
 * @param categoryID 카테고리 ID (선택적)
 * @param question 검색어 (선택적)
 * @param limit 한 페이지당 항목 수 (기본값: 10)
 * @param offset 시작 위치 (기본값: 0)
 * @returns FAQ 목록
 */
export async function getFaqs(
  tab: TabType,
  categoryID?: FaqCategoryID,
  question?: string,
  limit: number = 10,
  offset: number = 0,
): Promise<FaqListResponse> {
  try {
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

    const response = await fetch(`/api/faqs?${queryParams.toString()}`, {
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

import { z } from 'zod';

import { FaqCategoriesResponseSchema, FaqCategory, TabType } from './schema';
import { getApiUrl } from '@/src/utils/api';

/**
 * 탭별 카테고리 목록 조회
 * @param tab 탭 유형
 * @returns 카테고리 목록
 */
export async function getFaqCategories(tab: string): Promise<FaqCategory[]> {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('tab', tab);

    // 유틸리티 함수를 사용하여 API URL 생성
    const apiUrl = getApiUrl('/api/faq/categories', queryParams);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('카테고리 데이터를 불러오는데 실패했습니다.');
    }

    // 응답 데이터를 일반 JSON으로 파싱
    const rawData = await response.json();

    // zod 검증을 통해 타입 안전성 확보
    const validatedData = FaqCategoriesResponseSchema.parse(rawData);

    // 요청한 탭의 카테고리 데이터 반환
    return validatedData[tab as TabType] || [];
  } catch (error) {
    if (error instanceof z.ZodError) {
      // zod 검증 에러 처리
      console.error('데이터 형식 오류:', error.errors);
      throw new Error('API 응답 데이터 형식이 올바르지 않습니다.');
    }
    console.error('카테고리 API 오류:', error);
    throw error;
  }
}

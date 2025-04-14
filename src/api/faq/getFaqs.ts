import { z } from 'zod';

import { Faq, FaqsResponseSchema, TabType } from './schema';

/**
 * 탭별 FAQ 목록 조회
 * @param tab 탭 유형 (CONSULT 또는 USAGE)
 * @returns FAQ 목록
 */
export async function getFaqs(tab: TabType): Promise<Faq[]> {
  try {
    const response = await fetch('http://localhost:3001/faqs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('FAQ 데이터를 불러오는데 실패했습니다.');
    }

    const rawData = await response.json();
    const validatedData = FaqsResponseSchema.parse(rawData);

    return validatedData[tab] || [];
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('데이터 형식 오류:', error.errors);
      throw new Error('API 응답 데이터 형식이 올바르지 않습니다.');
    }
    console.error('FAQ API 오류:', error);
    throw error;
  }
}

import { z } from 'zod';

import { getApiUrl } from '@/src/utils/api';

import { Term, TermSchema, TermsClassID, TermsClassIDSchema } from './schema';

/**
 * 약관 정보 조회
 * @param termsClassID 약관 클래스 ID (JOIN_SERVICE_USE)
 * @returns 약관 정보 목록
 */
export async function getTerms(termsClassID: TermsClassID): Promise<Term[]> {
  try {
    // termsClassID 값 검증
    const validatedTermsClassID = TermsClassIDSchema.safeParse(termsClassID);
    if (!validatedTermsClassID.success) {
      throw new Error('유효하지 않은 약관 클래스 ID입니다.');
    }

    const queryParams = new URLSearchParams();
    queryParams.append('termsClassID', validatedTermsClassID.data);

    // 유틸리티 함수를 사용하여 API URL 생성
    const apiUrl = getApiUrl('/api/terms', queryParams);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('약관 데이터를 불러오는데 실패했습니다.');
    }

    // 응답 데이터를 일반 JSON으로 파싱
    const data = await response.json();

    // zod 검증을 통해 타입 안전성 확보
    const validatedData = z.array(TermSchema).parse(data);

    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // zod 검증 에러 처리
      console.error('데이터 형식 오류:', error.errors);
      throw new Error('API 응답 데이터 형식이 올바르지 않습니다.');
    }
    console.error('약관 API 오류:', error);
    throw error;
  }
}

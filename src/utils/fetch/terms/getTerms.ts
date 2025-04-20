import { z } from 'zod';

import { apiRequest } from '@/src/utils/apiHelper';

import { TermSchema, TermsClassIDSchema } from './schema';

import type { Term, TermsClassID } from './schema';

/**
 * 약관 정보 조회
 * @param params.termsClassID 약관 클래스 ID (JOIN_SERVICE_USE)
 * @returns 약관 정보 목록
 */
export async function getTerms({ termsClassID }: { termsClassID: TermsClassID }): Promise<Term[]> {
  try {
    const validatedTermsClassID = TermsClassIDSchema.safeParse(termsClassID);

    if (!validatedTermsClassID.success) {
      throw new Error('유효하지 않은 약관 클래스 ID입니다.');
    }

    // 공통 API 요청 함수 사용
    return await apiRequest(
      '/api/terms',
      { termsClassID: validatedTermsClassID.data },
      z.array(TermSchema),
    );
  } catch (error) {
    console.error('약관 API 오류:', error);
    throw error;
  }
}

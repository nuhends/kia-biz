import axios from 'axios';
import { z } from 'zod';

import type { AxiosError, AxiosRequestConfig } from 'axios';

/**
 * API 요청에 사용할 기본 URL을 가져옵니다.
 * 서버 사이드에서는 절대 URL이 필요하고, 클라이언트 사이드에서는 상대 경로를 사용합니다.
 * @returns API 기본 URL
 */
export const getApiBaseUrl = (): string => {
  // 서버 사이드에서 API를 호출할 때는 절대 URL이 필요
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  }

  // 클라이언트 사이드에서는 상대 경로를 사용(Nextjs API 사용하기 때문)
  return '';
};

/**
 * 객체 형태의 파라미터를 URLSearchParams로 변환합니다.
 * 값이 undefined인 속성은 제외됩니다.
 * @param params 파라미터 객체
 * @returns URLSearchParams 객체
 */
export const createQueryParams = (
  params: Record<string, string | number | boolean | undefined>,
): URLSearchParams => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });

  return queryParams;
};

/**
 * API 엔드포인트 URL을 생성합니다.
 * @param endpoint API 엔드포인트 경로 (예: '/api/terms')
 * @param queryParams 쿼리 파라미터 (선택 사항)
 * @returns 완전한 API URL
 */
export const getApiUrl = (endpoint: string, queryParams?: URLSearchParams): string => {
  const baseUrl = getApiBaseUrl();
  const queryString = queryParams ? `?${queryParams.toString()}` : '';

  return `${baseUrl}${endpoint}${queryString}`;
};

const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };

/**
 * 공통 API 요청 함수
 * 쿼리 파라미터 생성, 요청 전송, 오류 처리, 응답 검증을 한 번에 처리합니다.
 * @param endpoint API 엔드포인트 경로
 * @param params 요청 파라미터
 * @param schema Zod 응답 스키마
 * @param options Axios 요청 옵션
 * @returns 검증된 응답 데이터
 */
export async function apiRequest<
  T,
  P extends Record<string, string | number | boolean | undefined>,
>(endpoint: string, params: P, schema: z.ZodType<T>, options?: AxiosRequestConfig): Promise<T> {
  try {
    const queryParams = createQueryParams(params);
    const apiUrl = getApiUrl(endpoint, queryParams);
    const requestConfig: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
        ...options?.headers,
      },
      ...options,
    };

    const response = await axios(apiUrl, requestConfig);

    // Zod 스키마로 응답 데이터 검증
    const validatedData = schema.parse(response.data);
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('데이터 형식 오류:', error.errors);
      throw new Error('API 응답 데이터 형식이 올바르지 않습니다.');
    }

    // Axios 에러 처리
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error(`API 오류 (${endpoint}):`, axiosError.message);
      throw new Error(`API 요청 실패: ${axiosError.message}`);
    }

    // 기타 에러 처리
    console.error(`API 오류 (${endpoint}):`, error);
    throw error;
  }
}

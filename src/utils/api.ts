/**
 * API 관련 유틸리티 함수
 */

/**
 * API 요청에 사용할 기본 URL을 가져옵니다.
 * 서버 사이드에서는 절대 URL이 필요하고, 클라이언트 사이드에서는 상대 경로를 사용합니다.
 * @returns API 기본 URL
 */
export function getApiBaseUrl(): string {
  // 서버 사이드에서 API를 호출할 때는 절대 URL이 필요합니다.
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  }

  // 클라이언트 사이드에서는 상대 경로를 사용합니다.
  return '';
}

/**
 * API 엔드포인트 URL을 생성합니다.
 * @param endpoint API 엔드포인트 경로 (예: '/api/terms')
 * @param queryParams 쿼리 파라미터 (선택 사항)
 * @returns 완전한 API URL
 */
export function getApiUrl(endpoint: string, queryParams?: URLSearchParams): string {
  const baseUrl = getApiBaseUrl();
  const queryString = queryParams ? `?${queryParams.toString()}` : '';

  return `${baseUrl}${endpoint}${queryString}`;
}

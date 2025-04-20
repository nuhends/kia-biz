import axios from 'axios';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { apiRequest, createQueryParams, getApiBaseUrl, getApiUrl } from './apiHelper';

describe('getApiBaseUrl', () => {
  const originalWindow = global.window;
  const originalEnv = process.env;

  beforeEach(() => {
    // 환경 변수 초기화
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // 테스트 후 환경 복원
    global.window = originalWindow;
    process.env = originalEnv;
  });

  it('서버 사이드에서는 환경 변수에 설정된 URL을 반환해야 함', () => {
    // window 객체를 undefined로 설정하여 서버 사이드 환경 시뮬레이션
    // @ts-expect-error - 테스트 목적으로 window를 undefined로 설정
    global.window = undefined;

    // 환경 변수 설정
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';

    expect(getApiBaseUrl()).toBe('https://api.example.com');
  });

  it('서버 사이드에서 환경 변수가 없을 경우 기본값을 반환해야 함', () => {
    // window 객체를 undefined로 설정하여 서버 사이드 환경 시뮬레이션
    // @ts-expect-error - 테스트 목적으로 window를 undefined로 설정
    global.window = undefined;

    // 환경 변수 제거
    delete process.env.NEXT_PUBLIC_API_URL;

    expect(getApiBaseUrl()).toBe('http://localhost:3000');
  });

  it('클라이언트 사이드에서는 빈 문자열을 반환해야 함', () => {
    // window 객체가 있는 클라이언트 사이드 환경 시뮬레이션
    // @ts-expect-error - 테스트 목적으로 window를 빈 객체로 설정
    global.window = {};

    expect(getApiBaseUrl()).toBe('');
  });
});

describe('getApiUrl', () => {
  const originalWindow = global.window;
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    global.window = originalWindow;
    process.env = originalEnv;
  });

  it('서버 사이드에서 엔드포인트만 있는 경우 올바른 URL을 생성해야 함', () => {
    // 서버 사이드 환경 시뮬레이션
    // @ts-expect-error - 테스트 목적으로 window를 undefined로 설정
    global.window = undefined;
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';

    const endpoint = '/api/terms';
    expect(getApiUrl(endpoint)).toBe('https://api.example.com/api/terms');
  });

  it('서버 사이드에서 쿼리 파라미터가 있는 경우 올바른 URL을 생성해야 함', () => {
    // 서버 사이드 환경 시뮬레이션
    // @ts-expect-error - 테스트 목적으로 window를 undefined로 설정
    global.window = undefined;
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';

    const endpoint = '/api/terms';
    const queryParams = new URLSearchParams();
    queryParams.append('version', '1.0');
    queryParams.append('lang', 'ko');

    expect(getApiUrl(endpoint, queryParams)).toBe(
      'https://api.example.com/api/terms?version=1.0&lang=ko',
    );
  });

  it('클라이언트 사이드에서 엔드포인트만 있는 경우 상대 경로 URL을 생성해야 함', () => {
    // 클라이언트 사이드 환경 시뮬레이션
    // @ts-expect-error - 테스트 목적으로 window를 빈 객체로 설정
    global.window = {};

    const endpoint = '/api/terms';
    expect(getApiUrl(endpoint)).toBe('/api/terms');
  });

  it('클라이언트 사이드에서 쿼리 파라미터가 있는 경우 상대 경로 URL을 생성해야 함', () => {
    // 클라이언트 사이드 환경 시뮬레이션
    // @ts-expect-error - 테스트 목적으로 window를 빈 객체로 설정
    global.window = {};

    const endpoint = '/api/terms';
    const queryParams = new URLSearchParams();
    queryParams.append('version', '1.0');
    queryParams.append('lang', 'ko');

    expect(getApiUrl(endpoint, queryParams)).toBe('/api/terms?version=1.0&lang=ko');
  });
});

describe('createQueryParams', () => {
  it('문자열, 숫자, 불리언 값을 포함한 객체를 URLSearchParams로 변환해야 함', () => {
    const params = {
      name: '홍길동',
      age: 30,
      isActive: true,
    };

    const queryParams = createQueryParams(params);

    expect(queryParams.get('name')).toBe('홍길동');
    expect(queryParams.get('age')).toBe('30');
    expect(queryParams.get('isActive')).toBe('true');
  });

  it('undefined 값은 제외하고 URLSearchParams를 생성해야 함', () => {
    const params = {
      name: '홍길동',
      age: undefined,
      isActive: true,
    };

    const queryParams = createQueryParams(params);

    expect(queryParams.has('name')).toBe(true);
    expect(queryParams.has('age')).toBe(false);
    expect(queryParams.has('isActive')).toBe(true);
  });

  it('빈 객체를 전달하면 빈 URLSearchParams를 반환해야 함', () => {
    const params = {};
    const queryParams = createQueryParams(params);

    expect(queryParams.toString()).toBe('');
  });

  it('toString 메서드로 올바른 쿼리 문자열을 생성해야 함', () => {
    const params = {
      name: '홍길동',
      category: '도서',
      page: 1,
    };

    const queryParams = createQueryParams(params);

    expect(queryParams.toString()).toBe(
      'name=%ED%99%8D%EA%B8%B8%EB%8F%99&category=%EB%8F%84%EC%84%9C&page=1',
    );
  });
});

describe('apiRequest', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // axios mock 설정
  vi.mock('axios', () => {
    return {
      default: vi.fn(),
    };
  });

  it('성공적인 API 요청을 처리해야 함', async () => {
    // 응답 스키마 정의
    const userSchema = z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
    });

    // 목업 응답 설정
    const mockResponse = {
      data: {
        id: 1,
        name: '홍길동',
        email: 'hong@example.com',
      },
    };

    // axios 목업 설정
    vi.mocked(axios).mockResolvedValueOnce(mockResponse);

    // API 요청 실행
    const result = await apiRequest('/api/users/1', { lang: 'ko' }, userSchema);

    // 결과 검증
    expect(result).toEqual(mockResponse.data);
    expect(axios).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('Zod 검증 오류를 적절히 처리해야 함', async () => {
    // 응답 스키마 정의 (email 필드 필수)
    const userSchema = z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
    });

    // 유효하지 않은 응답 (email 필드 누락)
    const mockResponse = {
      data: {
        id: 1,
        name: '홍길동',
      },
    };

    // axios 목업 설정
    vi.mocked(axios).mockResolvedValueOnce(mockResponse);

    // API 요청 실행 및 오류 처리 검증
    await expect(apiRequest('/api/users/1', {}, userSchema)).rejects.toThrow(
      'API 응답 데이터 형식이 올바르지 않습니다.',
    );
  });

  it('일반 오류를 적절히 처리해야 함', async () => {
    // 응답 스키마 정의
    const userSchema = z.object({
      id: z.number(),
      name: z.string(),
    });

    // 일반 오류 설정
    const errorToThrow = new Error('일반 오류 발생');
    vi.mocked(axios).mockRejectedValueOnce(errorToThrow);

    // API 요청 실행 및 오류 처리 검증
    await expect(apiRequest('/api/users/1', {}, userSchema)).rejects.toThrow();
  });

  it('요청 옵션이 올바르게 병합되어야 함', async () => {
    // 응답 스키마 정의
    const dataSchema = z.object({
      success: z.boolean(),
    });

    // 목업 응답 설정
    const mockResponse = {
      data: {
        success: true,
      },
    };

    // axios 목업 설정
    vi.mocked(axios).mockResolvedValueOnce(mockResponse);

    // 사용자 지정 옵션으로 API 요청 실행
    await apiRequest('/api/data', {}, dataSchema, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer token123',
        'Accept-Language': 'ko-KR',
      },
      data: { payload: 'test' },
    });

    // 요청 옵션 검증 - 모킹된 axios에 전달되는 실제 요청 내용만 검증
    expect(axios).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        data: { payload: 'test' },
      }),
    );

    // 헤더에 대한 개별 확인
    const axiosCall = vi.mocked(axios).mock.calls[0]?.[1];
    expect(axiosCall?.headers).toHaveProperty('Authorization', 'Bearer token123');
    expect(axiosCall?.headers).toHaveProperty('Accept-Language', 'ko-KR');
  });
});

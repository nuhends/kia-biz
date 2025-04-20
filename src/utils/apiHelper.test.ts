import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getApiBaseUrl, getApiUrl } from './apiHelper';

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

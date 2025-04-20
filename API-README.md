# FAQ 카테고리 API 문서

이 프로젝트는 FAQ 카테고리 관련 API를 제공합니다.

## 파일 구조

```
src/
├── pages/
│   └── api/
│       ├── faq/
│       │   ├── categories.ts    # 카테고리 API 엔드포인트
│       │   └── faqs.ts          # FAQ 목록 API 엔드포인트
│       └── terms.ts             # 약관 정보 API 엔드포인트
└── utils/
    ├── apiHelper.ts            # API 요청 도우미 함수
    └── fetch/
        ├── index.ts            # 모듈 내보내기
        └── faq/                # FAQ 관련 API 클라이언트
            ├── index.ts        # FAQ API 내보내기
            ├── schema.ts       # 타입과 스키마 정의
            ├── getFaqCategories.ts  # 카테고리 조회 API 클라이언트
            └── getFaqs.ts      # FAQ 목록 조회 API 클라이언트
```

## 사용 가능한 엔드포인트

### 카테고리 API

#### 전체 카테고리 정보 가져오기 (탭별 카테고리 모두 포함)

```
GET /api/faq/categories?tab={tab}
```

**쿼리 파라미터:**

- `tab`: FAQ 탭 (CONSULT 또는 USAGE) - **필수**

### FAQ API

#### FAQ 목록 가져오기

```
GET /api/faq/faqs?tab={tab}&categoryID={categoryID}&question={question}&limit={limit}&offset={offset}
```

**쿼리 파라미터:**

- `tab`: FAQ 탭 (CONSULT 또는 USAGE) - **필수**
- `categoryID`: 카테고리 ID (선택적)
- `question`: 검색어 (선택적)
- `limit`: 한 페이지당 항목 수 (기본값: 10)
- `offset`: 시작 위치 (기본값: 0)

## 응답 형식

### 카테고리 응답 예시

```json
{
  "CONSULT": [
    {
      "categoryID": "PRODUCT",
      "name": "서비스 상품"
    },
    {
      "categoryID": "COUNSELING",
      "name": "도입 상담"
    },
    {
      "categoryID": "CONTRACT",
      "name": "계약"
    }
  ],
  "USAGE": [
    {
      "categoryID": "SIGN_UP",
      "name": "가입문의"
    },
    ...
  ]
}
```

### FAQ 응답 예시

```json
{
  "items": [
    {
      "id": 1,
      "categoryID": "PRODUCT",
      "categoryName": "서비스 상품",
      "subCategoryName": "기본 이용",
      "question": "서비스 이용 방법은 어떻게 되나요?",
      "answer": "서비스 이용 방법에 대한 상세 설명..."
    },
    {
      "id": 2,
      "categoryID": "CONTRACT",
      "categoryName": "계약",
      "subCategoryName": "계약 기간",
      "question": "계약 기간은 어떻게 되나요?",
      "answer": "계약 기간에 대한 상세 설명..."
    }
  ],
  "pageInfo": {
    "limit": 10,
    "offset": 0,
    "nextOffset": 10,
    "prevOffset": 0,
    "totalRecord": 42
  }
}
```

## 타입 안전성

이 프로젝트는 Zod 라이브러리를 사용하여 런타임 타입 검증을 구현하고 있습니다. 이를 통해 API 응답 데이터의 구조를 검증하고 안전하게 처리합니다.

### Zod 스키마 정의

```typescript
// src/utils/fetch/faq/schema.ts
import { z } from 'zod';

// 탭 타입 스키마
export const TabTypeSchema = z.enum(['CONSULT', 'USAGE']);
export type TabType = z.infer<typeof TabTypeSchema>;

// 카테고리 ID 스키마 - 허용된 카테고리 ID 값
export const FaqCategoryIDSchema = z.enum([
  'PRODUCT',
  'COUNSELING',
  'CONTRACT',
  'SIGN_UP',
  'BUSINESS',
  'ACCIDENT',
  'RESERVATION',
  'VEHICLE',
  'REFUEL',
  'COUPON',
]);
export type FaqCategoryID = z.infer<typeof FaqCategoryIDSchema>;

// 카테고리 스키마
export const FaqCategorySchema = z.object({
  categoryID: z.string(),
  name: z.string(),
});
export type FaqCategory = z.infer<typeof FaqCategorySchema>;

// FAQ 항목 스키마
export const FaqSchema = z.object({
  id: z.number(),
  categoryID: FaqCategoryIDSchema,
  categoryName: z.string(),
  subCategoryName: z.string(),
  question: z.string(),
  answer: z.string(),
});
export type Faq = z.infer<typeof FaqSchema>;

// 페이지 정보 스키마
export const PageInfoSchema = z.object({
  limit: z.number(),
  offset: z.number(),
  nextOffset: z.number(),
  prevOffset: z.number(),
  totalRecord: z.number(),
});
export type PageInfo = z.infer<typeof PageInfoSchema>;

// FAQ 목록 응답 스키마
export const FaqListResponseSchema = z.object({
  items: z.array(FaqSchema),
  pageInfo: PageInfoSchema,
});
export type FaqListResponse = z.infer<typeof FaqListResponseSchema>;

// 전체 카테고리 응답 스키마
export const FaqCategoriesResponseSchema = z.record(TabTypeSchema, z.array(FaqCategorySchema));
export type FaqCategoriesResponse = z.infer<typeof FaqCategoriesResponseSchema>;
```

## API 요청 도우미 함수

프로젝트는 API 요청을 쉽게 처리하기 위한 도우미 함수를 제공합니다.

```typescript
// src/utils/apiHelper.ts의 주요 부분

/**
 * 공통 API 요청 함수
 * 쿼리 파라미터 생성, 요청 전송, 오류 처리, 응답 검증을 한 번에 처리합니다.
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
    // 오류 처리 로직...
  }
}
```

## 클라이언트 사용 예시

```typescript
import { faqApi } from '@/src/utils/fetch';

// 카테고리 조회
const categories = await faqApi.getFaqCategories({ tab: 'CONSULT' });

// FAQ 목록 조회
const faqs = await faqApi.getFaqs({
  tab: 'CONSULT',
  categoryID: 'PRODUCT',
  question: '검색어', // 선택적 검색어
  limit: 10, // 기본값: 10
  offset: 0, // 기본값: 0
});
```

## 서버 구현 정보

FAQ API는 다음과 같은 방식으로 구현되어 있습니다:

1. `db.json` 파일에서 데이터를 로드 (모의 데이터베이스)
2. 요청 파라미터 검증 (tab, categoryID 등)
3. 필터링 및 페이지네이션
4. 응답 구성 및 반환

실제 구현은 `src/pages/api/faq/*.ts` 파일에서 확인할 수 있습니다.

## 추가 정보

자세한 내용은 다음 문서를 참조하세요:

- [Zod 공식 문서](https://zod.dev/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

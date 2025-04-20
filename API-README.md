# FAQ 카테고리 API 문서

이 프로젝트는 FAQ 카테고리 관련 API를 제공합니다.

## 파일 구조

```
src/
└── api/
    ├── index.ts                 # API 모듈 내보내기
    └── faq/                     # FAQ 관련 API
        ├── index.ts             # FAQ API 내보내기
        ├── schema.ts            # 타입과 스키마 정의
        ├── getFaqCategories.ts  # 카테고리 조회 API
        └── getFaqs.ts          # FAQ 목록 조회 API
```

## 사용 가능한 엔드포인트

### 카테고리 API

#### 전체 카테고리 정보 가져오기 (탭별 카테고리 모두 포함)

```
GET /api/faq/categories
```

### FAQ API

#### FAQ 목록 가져오기

```
GET /api/faq/faqs?tab={tab}&categoryID={categoryID}&limit={limit}&offset={offset}
```

**쿼리 파라미터:**

- `tab`: FAQ 탭 (CONSULT 또는 USAGE)
- `categoryID`: 카테고리 ID (선택적)
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
// src/api/faq/schema.ts
import { z } from 'zod';

// 탭 타입 스키마
export const TabTypeSchema = z.enum(['CONSULT', 'USAGE']);
export type TabType = z.infer<typeof TabTypeSchema>;

// 카테고리 스키마
export const FaqCategorySchema = z.object({
  categoryID: z.string(),
  name: z.string(),
});
export type FaqCategory = z.infer<typeof FaqCategorySchema>;

// FAQ 항목 스키마
export const FaqItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  categoryID: z.string(),
  tab: TabTypeSchema,
});
export type FaqItem = z.infer<typeof FaqItemSchema>;

// FAQ 응답 스키마
export const FaqResponseSchema = z.object({
  items: z.array(FaqItemSchema),
  pageInfo: z.object({
    currentPage: z.number(),
    totalPages: z.number(),
    totalElements: z.number(),
    size: z.number(),
    hasNext: z.boolean(),
    hasPrevious: z.boolean(),
  }),
});
export type FaqResponse = z.infer<typeof FaqResponseSchema>;

// 전체 카테고리 응답 스키마
export const FaqCategoriesResponseSchema = z.record(TabTypeSchema, z.array(FaqCategorySchema));
```

### Zod 스키마 활용 예시

```typescript
// API 응답 검증 (src/api/faq/getFaqCategories.ts)
const rawData = await response.json();
const validatedData = FaqCategoriesResponseSchema.parse(rawData);

// FAQ 응답 검증 (src/api/faq/getFaqs.ts)
const rawFaqData = await response.json();
const validatedFaqData = FaqResponseSchema.parse(rawFaqData);

// 입력값 검증 (src/screens/Faq/FaqScreen.tsx)
try {
  const validatedTab = faqApi.TabTypeSchema.parse(tab);
  setActiveTab(validatedTab);
} catch (err) {
  console.error('잘못된 탭 타입:', err);
  // 오류 처리
}
```

## 클라이언트 사용 예시

```typescript
import { faqApi } from '../../api';

// 카테고리 조회
const consultCategories = await faqApi.getFaqCategories({ tab: 'CONSULT' });

// FAQ 목록 조회
const faqs = await faqApi.getFaqs(
  'CONSULT',
  'PRODUCT',
  10, // limit
  0, // offset
);
```

## 추가 정보

자세한 내용은 다음 문서를 참조하세요:

- [Zod 공식 문서](https://zod.dev/)

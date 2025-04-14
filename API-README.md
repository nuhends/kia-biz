# json-server FAQ 카테고리 API 문서

이 프로젝트는 json-server를 사용하여 FAQ 카테고리 관련 API를 모킹합니다.

## 파일 구조

```
src/
└── api/
    ├── index.ts                 # API 모듈 내보내기
    └── faq/                     # FAQ 관련 API
        ├── index.ts             # FAQ API 내보내기
        ├── schema.ts            # 타입과 스키마 정의
        └── getFaqCategories.ts  # 카테고리 조회 API
```

## 설치 및 실행

1. 종속성 설치(이미 완료되었다면 생략):

```bash
yarn install
```

2. API 서버 실행:

```bash
yarn run mock-api
```

서버는 기본적으로 `http://localhost:3001`에서 실행됩니다.

## 사용 가능한 엔드포인트

### 카테고리 API

#### 전체 카테고리 정보 가져오기 (탭별 카테고리 모두 포함)

```
GET /faqCategories
```

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

// 전체 응답 스키마
export const FaqCategoriesResponseSchema = z.record(TabTypeSchema, z.array(FaqCategorySchema));
```

### Zod 스키마 활용 예시

```typescript
// API 응답 검증 (src/api/faq/getFaqCategories.ts)
const rawData = await response.json();
const validatedData = FaqCategoriesResponseSchema.parse(rawData);

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
const consultCategories = await faqApi.getFaqCategories('CONSULT');
```

## 추가 정보

자세한 내용은 다음 문서를 참조하세요:

- [json-server 공식 문서](https://github.com/typicode/json-server)
- [Zod 공식 문서](https://zod.dev/)

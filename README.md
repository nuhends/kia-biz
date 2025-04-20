# KIA BIZ 웹 애플리케이션

KIA BIZ는 기아 비즈니스 웹사이트로, FAQ, 뉴스, 가이드, 상담 등 다양한 기능을 제공합니다. 모든 페이지는 서버 사이드 렌더링(SSR)을 기반으로 구현되어 있어 초기 로딩 성능과 검색엔진 최적화(SEO)가 우수합니다.

## 기술 스택

- **프레임워크**: Next.js 15.3.0 (SSR 기반)
- **언어**: TypeScript
- **스타일링**: TailwindCSS
- **상태 관리**: React Context API
- **데이터 검증**: Zod
- **테스트**: Vitest
- **HTTP 클라이언트**: Axios

## 서버 사이드 렌더링 (SSR)

이 프로젝트의 모든 페이지는 Next.js의 `getServerSideProps`를 사용하여 서버 사이드 렌더링으로 구현되었습니다. 이를 통해 다음과 같은 이점을 제공합니다:

- 빠른 초기 페이지 로드
- 검색엔진 최적화(SEO)
- 소셜 미디어 공유 시 메타데이터 제공
- 서버에서 데이터를 미리 가져와 클라이언트로 전달

예시 구현:

```typescript
// pages/faq/index.tsx
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const defaultTab = FAQ_TAB_LIST[0].tab;
  const initialTab = String(query?.tab || defaultTab);
  const categoryID = String(query?.categoryID || '');

  const [categories, terms, faqData] = await Promise.all([
    getFaqCategories({ tab: initialTab }),
    getTerms({ termsClassID: 'JOIN_SERVICE_USE' }),
    getFaqs({
      tab: initialTab,
      ...(categoryID && { categoryID }),
    }),
  ]);

  return {
    props: {
      categories,
      initialFaqData: faqData,
      initialTab,
      terms,
    },
  };
};
```

## 시작하기

### 필수 요구 사항

- Node.js 18.0.0 이상
- Yarn 또는 npm 패키지 매니저

### 설치

프로젝트 클론 후 다음 명령어로 의존성을 설치합니다:

```bash
yarn install
# 또는
npm install
```

### 환경 변수 설정

`.environments/.env.local` 파일을 확인하거나 생성하여 필요한 환경 변수를 설정합니다:

```
NEXT_PUBLIC_DEPLOY_ENV=local
NEXT_PUBLIC_API_URL='http://localhost:3000'
```

### 개발 서버 실행

아래 명령어로 개발 서버를 실행합니다:

```bash
yarn dev
# 또는
npm run dev
```

개발 서버가 시작되면 [http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

## 프로젝트 구조

```
src/
├── api/              # API 클라이언트 (fetch 모듈)
├── components/       # 재사용 가능한 UI 컴포넌트
├── constants/        # 상수 정의
├── context/          # React Context 정의
├── hooks/            # 커스텀 React Hooks
├── pages/            # Next.js 페이지 및 API 라우트
│   ├── api/          # Next.js API 엔드포인트
│   │   ├── faq/      # FAQ 관련 API
│   │   └── terms.ts  # 약관 관련 API
├── screens/          # 페이지별 화면 컴포넌트
├── styles/           # 전역 스타일 정의
└── utils/            # 유틸리티 함수
    └── fetch/        # API 클라이언트 함수
```

## 주요 기능

### FAQ 시스템

- `CONSULT`와 `USAGE` 두 가지 탭으로 구분된 FAQ 시스템
- 카테고리 필터링
- 검색 기능
- 페이지네이션

### API

- Next.js API 라우트를 통한 로컬 API 서버
- Zod를 사용한 런타임 타입 검증
- 공통 API 요청 도우미 함수
- 상세한 내용은 [API-README.md](./API-README.md) 참조

## 테스트

프로젝트에는 Vitest를 사용한 테스트가 포함되어 있습니다. 테스트를 실행하려면:

### 모든 테스트 실행 (감시 모드)

```bash
yarn test
# 또는
npm run test
```

### 모든 테스트 한 번 실행

```bash
yarn test:run
# 또는
npm run test:run
```

## 코드 품질

### 린트 실행

```bash
yarn lint
# 또는
npm run lint
```

## API 문서

자세한 API 문서는 [API-README.md](./API-README.md) 파일을 참조하세요. 여기에는 다음 정보가 포함되어 있습니다:

- API 엔드포인트 설명
- 파라미터 및 응답 형식
- 스키마 정의
- 클라이언트 사용 예시

## 모의 데이터베이스

프로젝트는 `db.json` 파일을 사용하여 모의 데이터베이스를 제공합니다. API 엔드포인트는 이 파일에서 데이터를 읽어와 제공합니다.

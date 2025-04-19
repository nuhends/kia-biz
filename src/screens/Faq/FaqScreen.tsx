import ContentTitle from '@/src/components/Layout/ContentTitle';
import ProcessInfoSection from '@/src/components/ProcessSection/ProcessInfoSection';
import { PROCESS_INFO } from '@/src/constants/contents';

import AppInfoSection from './AppInfoSection';
import CategoryNavTab from './CategoryNavTab';
import { FaqProvider } from './contexts/FaqContext';
import FaqList from './FaqList';
import FaqSearchGroup from './FaqSearchGroup';
import FilterList from './FilterList';
import InquiryInfoSection from './InquiryInfoSection';

import type { FC } from 'react';
import type { FaqListResponse } from '@/src/api/faq';
import type { FaqCategory } from '@/src/api/faq/schema';

export interface FaqScreenProps {
  categories: FaqCategory[];
  initialFaqData: FaqListResponse;
  initialTab: string;
  initialQuestionQuery?: string;
}

const FaqScreen: FC<FaqScreenProps> = ({
  categories,
  initialFaqData,
  initialTab,
  initialQuestionQuery,
}) => {
  return (
    <FaqProvider initialFaqData={initialFaqData} initialQuestionQuery={initialQuestionQuery}>
      <ContentTitle title="자주 묻는 질문" description="궁금하신 내용을 빠르게 찾아보세요." />
      {/* 카테고리 탭 */}
      <CategoryNavTab initialTab={initialTab} />
      {/* 검색 UI */}
      <FaqSearchGroup totalRecord={initialFaqData.pageInfo.totalRecord} />
      {/* 카테고리 필터 */}
      <FilterList className="mt-(--px-md)" categories={categories} />
      {/* FAQ 목록 */}
      <FaqList initialTab={initialTab} />
      {/* 서비스 문의 */}
      <InquiryInfoSection />
      {/* 이용 프로세스 안내 */}
      <ProcessInfoSection title="이용 프로세스 안내" processInfo={PROCESS_INFO} />
      {/* app 링크 제공  */}
      <AppInfoSection className="mt-[48px] xl:mt-[64px]" />
    </FaqProvider>
  );
};

export default FaqScreen;

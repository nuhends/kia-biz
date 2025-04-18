import { useState } from 'react';

import ContentTitle from '@/src/components/Layout/ContentTitle';
import ProcessInfoSection from '@/src/components/ProcessSection/ProcessInfoSection';
import { PROCESS_INFO } from '@/src/constants/contents';

import AppInfoSection from './AppInfoSection';
import CategoryNavTab from './CategoryNavTab';
import FaqList from './FaqList';
import FilterList from './FilterList';
import InquiryInfoSection from './InquiryInfoSection';

import type { FaqListResponse } from '@/src/api/faq';
import type { FC } from 'react';
import type { FaqCategory } from '@/src/api/faq/schema';
import FaqSearchGroup from './FaqSearchGroup';

export interface FaqScreenProps {
  categories: FaqCategory[];
  faqData: FaqListResponse;
  initialTab: string;
  initialQuestionQuery?: string;
}

const FaqScreen: FC<FaqScreenProps> = ({
  categories,
  faqData,
  initialTab,
  initialQuestionQuery,
}) => {
  const [questionValue, setQuestionValue] = useState(initialQuestionQuery ?? '');

  const resetQuestionValue = () => setQuestionValue('');

  return (
    <>
      <ContentTitle title="자주 묻는 질문" description="궁금하신 내용을 빠르게 찾아보세요." />
      {/* 카테고리 탭 */}
      <CategoryNavTab initialTab={initialTab} onClickNavTab={resetQuestionValue} />
      {/* 검색 UI */}
      <FaqSearchGroup
        totalRecord={faqData.pageInfo.totalRecord}
        questionValue={questionValue}
        setQuestionValue={setQuestionValue}
      />
      {/* 카테고리 필터 */}
      <FilterList className="mt-(--px-md)" categories={categories} questionValue={questionValue} />
      {/* FAQ 목록 */}
      <FaqList faqData={faqData} initialTab={initialTab} />
      {/* 서비스 문의 */}
      <InquiryInfoSection />
      {/* 이용 프로세스 안내 */}
      <ProcessInfoSection title="이용 프로세스 안내" processInfo={PROCESS_INFO} />
      {/* app 링크 제공  */}
      <AppInfoSection className="mt-[48px] xl:mt-[64px]" />
    </>
  );
};

export default FaqScreen;

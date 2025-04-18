import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import IconClear from '@/public/svgs/ic_clear.svg';
import IconInit from '@/public/svgs/ic_init.svg';
import IconSearch from '@/public/svgs/ic_search.svg';
import { faqApi } from '@/src/api';
import ContentTitle from '@/src/components/Layout/ContentTitle';
import ProcessInfoSection from '@/src/components/ProcessSection/ProcessInfoSection';
import { PROCESS_INFO } from '@/src/constants/contents';

import AppInfoSection from './AppInfoSection';
import CategoryNavTab from './CategoryNavTab';
import { ITEMS_PER_PAGE } from './constants';
import FaqSection from './FaqSection';
import FilterList from './FilterList';
import InquiryInfoSection from './InquiryInfoSection';

import type { FC } from 'react';
import type { FaqCategory } from '@/src/api/faq/schema';

/**
 * FAQ 화면 컴포넌트
 * - 탭(CONSULT/USAGE)에 따라 카테고리 목록을 불러와 표시
 * - 카테고리 선택 기능 제공
 * - 선택된 탭과 카테고리에 따라 FAQ 목록 표시
 * - 검색 기능 제공
 */
export interface FaqScreenProps {
  categories: FaqCategory[];
  initialTab: string;
}

const FaqScreen: FC<FaqScreenProps> = ({ categories, initialTab }) => {
  // 상태 관리
  const [activeTab, setActiveTab] = useState<faqApi.TabType>('CONSULT');
  const [selectedCategoryID, setSelectedCategoryID] = useState<faqApi.FaqCategoryID | null>(null);
  const [faqs, setFaqs] = useState<faqApi.Faq[]>([]);
  const [faqsData, setFaqsData] = useState<faqApi.FaqListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRecord, setTotalRecord] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const prevSearchQuery = useRef('');

  // 탭이 변경될 때 카테고리 목록과 FAQ 목록 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesResult, faqsResult] = await Promise.all([
          faqApi.getFaqCategories(activeTab),
          faqApi.getFaqs(
            activeTab,
            selectedCategoryID || undefined,
            isSearching ? searchQuery : undefined,
            ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE,
          ),
        ]);
        setFaqsData(faqsResult);
        // setCategories(categoriesResult);
        setFaqs(faqsResult.items);
        setTotalRecord(faqsResult.pageInfo.totalRecord);
      } catch (err) {
        setError('데이터를 불러오는데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, selectedCategoryID, currentPage, isSearching]);

  // 이벤트 핸들러
  const handleTabChange = (tab: faqApi.TabType) => {
    // Zod 스키마를 사용한 타입 검증
    try {
      const validatedTab = faqApi.TabTypeSchema.parse(tab);
      setActiveTab(validatedTab);
      setSelectedCategoryID(null); // 탭 변경 시 선택된 카테고리 초기화
      setCurrentPage(0); // 페이지 초기화
      setIsSearching(false); // 검색 초기화
      setSearchQuery(''); // 검색어 초기화
    } catch (err) {
      console.error('잘못된 탭 타입:', err);
      // 오류 발생 시 기본 탭으로 설정
      setActiveTab('CONSULT');
    }
  };

  const handleCategorySelect = (categoryID: faqApi.FaqCategoryID | null) => {
    setSelectedCategoryID(categoryID);
    setCurrentPage(0); // 카테고리 변경 시 페이지 초기화
    // 서브탭 변경 시에는 검색 상태와 검색어를 유지
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    if (searchQuery.trim().length < 2) {
      alert('검색어는 2글자 이상 입력해주세요.');
      return;
    }

    // 검색어가 변경되었거나 검색 상태가 false인 경우에만 검색 실행
    if (!isSearching || searchQuery !== prevSearchQuery.current) {
      setIsSearching(true);
      setCurrentPage(0); // 검색 시 페이지 초기화
      prevSearchQuery.current = searchQuery; // 현재 검색어 저장
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleResetSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  // 로딩 및 에러 처리
  // if (loading && !categories.length) {
  //   return <div className="text-center p-8">로딩 중...</div>;
  // }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <>
      <ContentTitle title="자주 묻는 질문" description="궁금하신 내용을 빠르게 찾아보세요." />
      {/* 카테고리 탭 */}
      <CategoryNavTab initialTab={initialTab} />
      {/* 검색 UI */}
      <div className="mt-(--px-lg) md:bg-gray-10 md:p-(--px-md)">
        <div className="flex w-(--search-bar-width)">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="찾으시는 내용을 입력해 주세요"
              className={classNames(
                'w-full h-(--btn-xlg2) pl-[16px] pr-[calc(var(--ic-sm)+var(--clear-space)+var(--btn-xlg2)-2px)] text-[1rem] border-midnight-900 bg-white',
              )}
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchKeyDown}
            />
            {searchQuery && (
              <button
                className="flex items-center justify-center absolute top-[1px] right-[calc(var(--btn-xlg2)-1px)] h-[calc(100%-2px)]"
                type="button"
                onClick={handleResetSearch}
              >
                <span
                  aria-hidden="true"
                  className="w-[24px] h-[24px] [&>svg]:w-full [&>svg]:h-full"
                >
                  <IconClear />
                </span>
                <span className="blind">검색어 초기화</span>
              </button>
            )}
            <button
              className="flex items-center justify-center absolute top-[1px] right-[1px] w-[calc(var(--btn-xlg2)-2px)] h-[calc(100%-2px)] text-white"
              type="button"
              onClick={handleSearch}
            >
              <span aria-hidden="true" className="w-[24px] h-[24px] [&>svg]:w-full [&>svg]:h-full">
                <IconSearch />
              </span>
              <span className="blind">검색</span>
            </button>
          </div>
        </div>
      </div>
      {/* 검색결과 정보 */}
      {!isSearching && (
        <div className="flex justify-between my-(--px-md)">
          <h3 className="leading-sm text-(length:--heading-info) font-bold">
            검색 결과 총 <em>{totalRecord}</em>건
          </h3>
          <button
            className={classNames(
              'flex items-center text-[14px] px-[2px]',
              'md:text-[16px] px-[4px]',
            )}
            type="button"
          >
            <span
              aria-hidden="true"
              className="w-(--ic-sm) h-(--ic-sm) mr-[2px] [&>svg]:w-full [&>svg]:h-full"
            >
              <IconInit />
            </span>
            검색초기화
          </button>
        </div>
      )}
      {/* 카테고리 필터 */}
      <FilterList categories={categories} className="mt-(--px-md)" />
      {/* FAQ 목록 */}
      <FaqSection faqsData={faqsData} tabType={activeTab} />
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

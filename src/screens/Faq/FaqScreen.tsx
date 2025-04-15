import { useEffect, useState, useRef } from 'react';

import { faqApi } from '@/src/api';

import { ITEMS_PER_PAGE } from './constants';

/**
 * FAQ 화면 컴포넌트
 * - 탭(CONSULT/USAGE)에 따라 카테고리 목록을 불러와 표시
 * - 카테고리 선택 기능 제공
 * - 선택된 탭과 카테고리에 따라 FAQ 목록 표시
 * - 검색 기능 제공
 */
const FaqScreen = () => {
  // 상태 관리
  const [activeTab, setActiveTab] = useState<faqApi.TabType>('CONSULT');
  const [categories, setCategories] = useState<faqApi.FaqCategory[]>([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState<faqApi.FaqCategoryID | null>(null);
  const [faqs, setFaqs] = useState<faqApi.Faq[]>([]);
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
        setCategories(categoriesResult);
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
  }, [activeTab, selectedCategoryID, currentPage, isSearching, searchQuery]);

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
  if (loading && !categories.length) {
    return <div className="text-center p-8">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  const totalPages = Math.ceil(totalRecord / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">자주 묻는 질문 (FAQ)</h1>

      {/* 탭 선택 */}
      <div className="mb-6">
        <div className="flex gap-4 border-b">
          <button
            className={`px-4 py-2 ${
              activeTab === 'CONSULT' ? 'border-b-2 border-blue-500 font-bold' : ''
            }`}
            onClick={() => handleTabChange('CONSULT')}
          >
            서비스 도입
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'USAGE' ? 'border-b-2 border-blue-500 font-bold' : ''
            }`}
            onClick={() => handleTabChange('USAGE')}
          >
            서비스 이용
          </button>
        </div>
      </div>

      {/* 검색 UI */}
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-full px-4 py-2 border rounded"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchKeyDown}
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={handleResetSearch}
                type="button"
                aria-label="검색어 초기화"
              >
                ✕
              </button>
            )}
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSearch}>
            검색
          </button>
        </div>
        {isSearching && (
          <div className="mt-2 text-sm text-gray-600">검색 결과 총 {totalRecord}건</div>
        )}
      </div>

      {/* 카테고리 필터 */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded ${
              selectedCategoryID === null ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleCategorySelect(null)}
          >
            전체
          </button>
          {categories.map((category) => (
            <button
              key={category.categoryID}
              className={`px-4 py-2 rounded ${
                selectedCategoryID === category.categoryID
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => handleCategorySelect(category.categoryID as faqApi.FaqCategoryID)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ 목록 */}
      <div className="space-y-4">
        {faqs.length > 0 ? (
          <>
            {faqs.map((faq) => (
              <div key={faq.id} className="border rounded p-4">
                <div className="text-gray-600">{`${faq.categoryName} > ${faq.subCategoryName}`}</div>
                <h3 className="font-bold mb-2">{faq.question}</h3>
                <div
                  className="text-gray-600 hidden"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            ))}
            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-2 rounded ${
                      currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center p-8 border rounded">
            <p>해당 카테고리의 FAQ가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqScreen;

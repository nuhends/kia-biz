import { useEffect, useState } from 'react';

import { faqApi } from '@/src/api';

/**
 * FAQ 화면 컴포넌트
 * - 탭(CONSULT/USAGE)에 따라 카테고리 목록을 불러와 표시
 * - 카테고리 선택 기능 제공
 */
const FaqScreen = () => {
  // 상태 관리
  const [activeTab, setActiveTab] = useState<faqApi.TabType>('CONSULT');
  const [categories, setCategories] = useState<faqApi.FaqCategory[]>([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 탭이 변경될 때 카테고리 목록 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const result = await faqApi.getFaqCategories(activeTab);
        setCategories(result);
        setSelectedCategoryID(null); // 탭 변경 시 선택된 카테고리 초기화
      } catch (err) {
        setError('카테고리 데이터를 불러오는데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [activeTab]);

  // 이벤트 핸들러
  const handleTabChange = (tab: faqApi.TabType) => {
    // Zod 스키마를 사용한 타입 검증
    try {
      const validatedTab = faqApi.TabTypeSchema.parse(tab);
      setActiveTab(validatedTab);
    } catch (err) {
      console.error('잘못된 탭 타입:', err);
      // 오류 발생 시 기본 탭으로 설정
      setActiveTab('CONSULT');
    }
  };

  const handleCategorySelect = (categoryID: string | null) => {
    setSelectedCategoryID(categoryID);
  };

  // 로딩 및 에러 처리
  if (loading && !categories.length) {
    return <div className="text-center p-8">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

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
            도입 상담
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 'USAGE' ? 'border-b-2 border-blue-500 font-bold' : ''
            }`}
            onClick={() => handleTabChange('USAGE')}
          >
            이용 방법
          </button>
        </div>
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
              onClick={() => handleCategorySelect(category.categoryID)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="p-8 text-center border rounded">
        <p>여기에 FAQ 콘텐츠가 표시됩니다.</p>
        <p className="mt-2 text-gray-500">
          {selectedCategoryID
            ? `선택된 카테고리: ${
                categories.find((c) => c.categoryID === selectedCategoryID)?.name ||
                selectedCategoryID
              }`
            : '모든 카테고리 표시'}
        </p>
      </div>
    </div>
  );
};

export default FaqScreen;

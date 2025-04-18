import classNames from 'classnames';
import { useRouter } from 'next/router';

import { getFaqs } from '@/src/api/faq/getFaqs';

import { useFaqContext } from './contexts/FaqContext';

import type { FC } from 'react';

const LoadMoreButton: FC = () => {
  const { query } = useRouter();
  const { faqData, isLoading, setFaqData, setIsLoading } = useFaqContext();
  const { tab, categoryID, question } = query;

  const loadMoreFaqs = async () => {
    setIsLoading(true);

    try {
      const newFaqData = await getFaqs({
        tab: String(tab),
        ...(categoryID && { categoryID: String(categoryID) }),
        ...(question && { question: String(question) }),
        offset: faqData.pageInfo.nextOffset,
      });

      setFaqData((prev) => ({
        ...prev,
        items: [...prev.items, ...newFaqData.items],
        pageInfo: newFaqData.pageInfo,
      }));
    } catch (error) {
      console.error('추가 FAQ 데이터 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    await loadMoreFaqs();
  };

  return (
    <div className="py-4">
      <button
        className="flex items-center justify-center w-full h-(--btn-xlg2) text-(length:--list-more-size)"
        type="button"
        onClick={handleClick}
        disabled={isLoading}
      >
        <span
          className={classNames(
            'relative w-[calc(var(--list-more-size)-4px)] h-[calc(var(--list-more-size)-4px)] mt-[-2px] mr-[4px]',
            'before:absolute before:top-[calc(50%-1px)] before:left-[0] before:w-full before:h-[2px] before:bg-midnight-900',
            'after:absolute after:top-[calc(50%-1px)] after:left-[0] after:w-full after:h-[2px] after:bg-midnight-900 after:rotate-90',
            { 'pointer-events-none': isLoading },
          )}
        />
        더보기
      </button>
    </div>
  );
};

export default LoadMoreButton;

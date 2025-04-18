import classNames from 'classnames';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, KeyboardEvent } from 'react';

import IconClear from '@/public/svgs/ic_clear.svg';
import IconInit from '@/public/svgs/ic_init.svg';
import IconSearch from '@/public/svgs/ic_search.svg';

import { useFaqContext } from './contexts/FaqContext';

const QUESTION_MIN_LENGTH = 2;

interface Props {
  totalRecord: number;
}

const FaqSearchGroup: FC<Props> = ({ totalRecord }) => {
  const { pathname, push, query } = useRouter();
  const { page, question, ...excludedQuery } = query;
  const { questionValue, setQuestionValue, resetQuestionValue, setIsLoading } = useFaqContext();

  const handleSearch = () => {
    if (questionValue.trim().length < QUESTION_MIN_LENGTH) {
      alert(`검색어는 ${QUESTION_MIN_LENGTH}글자 이상 입력해주세요.`);
      return;
    }

    setIsLoading(true);
    push({
      pathname,
      query: {
        ...excludedQuery,
        question: questionValue,
      },
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionValue(e.target.value);
  };

  const handleResetSearch = () => {
    resetQuestionValue();
    push({
      pathname,
      query: { ...excludedQuery },
    });
  };

  return (
    <div>
      <div className="mt-(--px-lg) md:bg-gray-10 md:p-(--px-md)">
        <div className="flex w-(--search-bar-width)">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="찾으시는 내용을 입력해 주세요"
              className={classNames(
                'w-full h-(--btn-xlg2) pl-[16px] pr-[calc(var(--ic-sm)+var(--clear-space)+var(--btn-xlg2)-2px)] text-[1rem] border-midnight-900 bg-white',
              )}
              value={questionValue}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchKeyDown}
            />
            {questionValue && (
              <button
                className="flex items-center justify-center absolute top-[1px] right-[calc(var(--btn-xlg2)-1px)] h-[calc(100%-2px)]"
                type="button"
                onClick={() => setQuestionValue('')}
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
      {/* 검색결과 정보: 검색 query가 있을때 표시 */}
      {question && (
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
            onClick={handleResetSearch}
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
    </div>
  );
};

export default FaqSearchGroup;

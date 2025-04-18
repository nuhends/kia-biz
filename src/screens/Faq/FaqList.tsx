import type { FaqListResponse } from '@/src/api/faq/schema';
import classNames from 'classnames';

import LoadingIndicator from '@/src/components/LoadingIndicator';

import { ITEMS_PER_PAGE } from './constants';
import { useFaqContext } from './contexts/FaqContext';
import FaqItem from './FaqItem';
import FaqNoData from './FaqNoData';

import type { ComponentProps, FC } from 'react';

interface Props extends ComponentProps<'section'> {
  faqData: FaqListResponse;
  initialTab: string;
}

const LoadMoreButton: FC = () => (
  <button
    className="flex items-center justify-center w-full h-(--btn-xlg2) mt-[calc(var(--px-lg)-8px)] text-(length:--list-more-size)"
    type="button"
  >
    <span
      className={classNames(
        'relative w-[calc(var(--list-more-size)-4px)] h-[calc(var(--list-more-size)-4px)] mt-[-2px] mr-[4px]',
        'before:absolute before:top-[calc(50%-1px)] before:left-[0] before:w-full before:h-[2px] before:bg-midnight-900',
        'after:absolute after:top-[calc(50%-1px)] after:left-[0] after:w-full after:h-[2px] after:bg-midnight-900 after:rotate-90',
      )}
    />
    더보기
  </button>
);

const FaqList = ({ faqData, initialTab, className }: Props) => {
  const { isLoading } = useFaqContext();

  const { items, pageInfo } = faqData;
  const hideSubCategory = initialTab === 'CONSULT';
  const totalPages = Math.ceil((pageInfo?.totalRecord ?? 1) / ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <section className={classNames('border-t-2 border-midnight-900', className)}>
        <LoadingIndicator />
      </section>
    );
  }

  return (
    <section className={classNames('border-t-2 border-midnight-900', className)}>
      {items.length > 0 ? (
        <>
          <ul>
            {items.map((faq) => (
              <FaqItem key={faq.id} hideSubCategory={hideSubCategory} {...faq} />
            ))}
          </ul>
          {totalPages > 1 && <LoadMoreButton />}
        </>
      ) : (
        <FaqNoData />
      )}
    </section>
  );
};

export default FaqList;

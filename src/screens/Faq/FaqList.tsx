import type { FaqListResponse } from '@/src/api/faq/schema';
import classNames from 'classnames';

import IconNoData from '@/public/svgs/ic_nodata.svg';

import { ITEMS_PER_PAGE } from './constants';
import FaqItem from './FaqItem';

import type { ComponentProps } from 'react';

interface Props extends ComponentProps<'section'> {
  faqData: FaqListResponse;
  initialTab: string;
}

const FaqList = ({ faqData, initialTab, className }: Props) => {
  const { items, pageInfo } = faqData;
  const hideSubCategory = initialTab === 'CONSULT';
  const totalPages = Math.ceil(pageInfo?.totalRecord ?? 1 / ITEMS_PER_PAGE);

  return (
    <section className={classNames('border-t-2 border-midnight-900', className)}>
      {items.length > 0 ? (
        <ul>
          {items.map((faq) => (
            <FaqItem key={faq.id} hideSubCategory={hideSubCategory} {...faq} />
          ))}
        </ul>
      ) : (
        <div className="py-(--space-box2) border-t-2 border-b-[1px] border-midnight-900 text-center">
          <span
            aria-hidden="true"
            className="block w-(--ic-xlg2) h-(--ic-xlg2) mx-auto [&>svg]:w-full [&>svg]:h-full"
          >
            <IconNoData />
          </span>
          <p className="mt-(--space-xsm) leading-md break-keep text-gray-500">
            검색결과가 없습니다.
          </p>
        </div>
      )}
      {totalPages > 1 && (
        <button
          className="flex items-center justify-center w-full h-(--btn-xlg2) mt-[calc(var(--px-lg)-8px)] text-(length:--list-more-size)"
          type="button"
        >
          {/* css로 그린 +아이콘  */}
          <span
            className={classNames(
              'relative w-[calc(var(--list-more-size)-4px)] h-[calc(var(--list-more-size)-4px)] mt-[-2px] mr-[4px]',
              'before:absolute before:top-[calc(50%-1px)] before:left-[0] before:w-full before:h-[2px] before:bg-midnight-900',
              'after:absolute after:top-[calc(50%-1px)] after:left-[0] after:w-full after:h-[2px] after:bg-midnight-900 after:rotate-90',
            )}
          />
          더보기
        </button>
      )}
    </section>
  );
};

export default FaqList;

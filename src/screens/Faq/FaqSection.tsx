import type { FaqListResponse, TabType } from '@/src/api/faq/schema';
import classNames from 'classnames';

import { ITEMS_PER_PAGE } from './constants';
import FaqItem from './FaqItem';

import type { ComponentProps } from 'react';

interface Props extends ComponentProps<'section'> {
  faqsData: FaqListResponse | null;
  tabType: TabType;
}

const FaqSection = ({ faqsData, tabType, className }: Props) => {
  const { items: faqs = [], pageInfo } = faqsData ?? {};
  const hideSubCategory = tabType === 'CONSULT';
  const totalPages = Math.ceil(pageInfo?.totalRecord ?? 1 / ITEMS_PER_PAGE);

  return (
    <section className={classNames('border-t-2 border-midnight-900', className)}>
      {faqs?.length > 0 ? (
        <ul>
          {faqs.map((faq) => (
            <FaqItem key={faq.id} hideSubCategory={hideSubCategory} {...faq} />
          ))}
        </ul>
      ) : (
        <div className="text-center p-8 border rounded">
          <p>해당 카테고리의 FAQ가 없습니다.</p>
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

export default FaqSection;

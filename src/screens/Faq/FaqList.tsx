import classNames from 'classnames';

import LoadingIndicator from '@/src/components/LoadingIndicator';

import { ITEMS_PER_PAGE } from './constants';
import { useFaqContext } from './contexts/FaqContext';
import FaqItem from './FaqItem';
import FaqNoData from './FaqNoData';
import LoadMoreButton from './LoadMoreButton';

import type { ComponentProps, FC } from 'react';

interface Props extends ComponentProps<'section'> {
  initialTab: string;
}

const FaqList: FC<Props> = ({ initialTab, className }) => {
  const { faqData, isLoading, isRouting } = useFaqContext();
  const { items, pageInfo } = faqData;
  const hideSubCategory = initialTab === 'CONSULT';
  const totalPages = Math.ceil((pageInfo?.totalRecord ?? 1) / ITEMS_PER_PAGE);

  if (items.length === 0) {
    return (
      <section className={classNames('border-t-2 border-midnight-900', className)}>
        {isRouting && <LoadingIndicator />}
        <FaqNoData />
      </section>
    );
  }

  return (
    <section className={classNames('border-t-2 border-midnight-900', className)}>
      <ul>
        {items.map((faq) => (
          <FaqItem key={faq.id} hideSubCategory={hideSubCategory} {...faq} />
        ))}
      </ul>
      {isLoading && <LoadingIndicator />}
      {totalPages > 1 && pageInfo.nextOffset > pageInfo.offset && <LoadMoreButton />}
    </section>
  );
};

export default FaqList;

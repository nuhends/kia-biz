import type { FaqCategory } from '@/src/utils/fetch/faq/schema';
import type { ComponentProps, FC } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import { useFaqContext } from './contexts/FaqContext';
import FilterItem from './FilterItem';

interface Props extends ComponentProps<'ul'> {
  categories: FaqCategory[];
}

const FilterList: FC<Props> = ({ categories, className }) => {
  const { pathname, query } = useRouter();
  const { page, categoryID, question, ...excludedQuery } = query;
  const { questionValue } = useFaqContext();
  const refinedCategories = [{ categoryID: '', name: '전체' }, ...categories];
  const currentCategory = query?.categoryID || refinedCategories[0].categoryID;

  return (
    <ul className={classNames('flex flex-wrap mb-(--px-md)', className)}>
      {refinedCategories.map(({ categoryID, name }) => (
        <li key={categoryID}>
          <FilterItem
            active={categoryID === currentCategory}
            href={{
              pathname,
              query: {
                ...excludedQuery,
                ...(categoryID !== '' && { categoryID }),
                ...(questionValue && { question: questionValue }),
              },
            }}
            label={name}
          />
        </li>
      ))}
    </ul>
  );
};

export default FilterList;

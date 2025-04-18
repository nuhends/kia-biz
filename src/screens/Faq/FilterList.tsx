import type { FaqCategory } from '@/src/api/faq/schema';
import type { ComponentProps, FC } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import FilterItem from './FilterItem';

interface Props extends ComponentProps<'ul'> {
  categories: FaqCategory[];
}

const FilterList: FC<Props> = ({ categories, className }) => {
  const { pathname, query } = useRouter();

  const { page, categoryID, ...excludedQuery } = query;
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

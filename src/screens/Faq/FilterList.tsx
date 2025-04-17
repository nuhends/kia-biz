import type { FaqCategory } from '@/src/api/faq/schema';
import type { ComponentProps, FC } from 'react';
import classNames from 'classnames';

import FilterItem from './FilterItem';

interface Props extends ComponentProps<'ul'> {
  categories: FaqCategory[];
}

const FilterList: FC<Props> = ({ categories, className }) => {
  return (
    <ul className={classNames('flex flex-wrap mb-(--px-md)', className)}>
      <li>
        <FilterItem active href="?categoryID=ALL" label="전체" />
      </li>

      {categories.map((category) => {
        return (
          <li key={category.categoryID}>
            <FilterItem href={`?categoryID=${category.categoryID}`} label={category.name} />
          </li>
        );
      })}
    </ul>
  );
};

export default FilterList;

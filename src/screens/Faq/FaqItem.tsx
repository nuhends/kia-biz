import classNames from 'classnames';
import { ComponentProps, FC, useState } from 'react';

import type { Faq } from '@/src/api/faq';

interface Props extends Omit<ComponentProps<'li'>, 'id'>, Faq {
  hideSubCategory?: boolean;
}

const FaqItem: FC<Props> = ({
  categoryName,
  subCategoryName,
  question,
  answer,
  hideSubCategory = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className="border-b-[1px] border-gray-100">
      <button
        aria-expanded={isExpanded}
        className={classNames(
          'flex flex-wrap flex-col items-start justify-between relative w-full py-(--faq-list-a-padding-v) pr-[calc(var(--px-xlg)+1.6em)] text-(length:--faq-list-a-size) leading-sm',
          "after:content-[''] after:absolute after:top-[50%] after:mt-[calc(var(--ic-md)/2*-1)] after:right-[calc((var(--px-xlg)-var(--ic-md))/2)] after:w-(--ic-md) after:h-(--ic-md) after:bg-[url('/svgs/ic_arrow.svg')] after:bg-no-repeat after:bg-center",
          {
            'after:rotate-180': isExpanded,
            'bg-gray-10': isExpanded,
          },
          'lg:flex-row lg:justify-start lg:flex-nowrap',
        )}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="flex text-[calc(1em-4px)] leading-sm text-gray-500 lg:items-center">
          <span className="lg:px-(--faq-list-a-padding-h) lg:w-[8em] lg:box-content text-(length:--faq-list-a-size)">
            {categoryName}
          </span>
          {!hideSubCategory && (
            <span
              className={classNames(
                "flex items-center before:content-[''] before:mx-[2px] before:w-4 before:h-4 before:bg-[url('/svgs/ic_arrow.svg')] before:bg-no-repeat before:bg-center before:rotate-[-90deg] before:opacity-30",
                'lg:before:hidden lg:px-(--faq-list-a-padding-h) lg:w-[6em] lg:box-content text-(length:--faq-list-a-size)',
              )}
            >
              {subCategoryName}
            </span>
          )}
        </div>
        <em
          className={classNames('mt-[4px] font-bold text-left', 'lg:pl-(--faq-list-a-padding-h)')}
        >
          {question}
        </em>
      </button>
      <div
        className={classNames(
          'text-gray-600 border-t-[1px] border-gray-100 text-[1rem]! leading-lg overflow-y-scroll p-(--faq-list-q-padding) [&>*]:all-revert',
          {
            hidden: !isExpanded,
          },
        )}
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </li>
  );
};

export default FaqItem;

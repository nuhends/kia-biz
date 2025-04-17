import classNames from 'classnames';
import Link from 'next/link';

import type { ComponentProps, FC } from 'react';

interface Props extends ComponentProps<'a'> {
  active?: boolean;
  href: string;
  label: string;
}

const FilterItem: FC<Props> = ({ active = false, label, href }) => {
  return (
    <Link
      className={classNames(
        'flex items-center justify-center min-w-(--btn-md) h-(--btn-md) px-(--space-sm) rounded-[calc(var(--btn-md)/2)] font-bold tracking-[0.4px]',
        {
          'bg-midnight-900 text-white': active,
        },
      )}
      href={href}
    >
      <span className="blind">현재 선택된 카테고리명</span>
      {label}
    </Link>
  );
};

export default FilterItem;

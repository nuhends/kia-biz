import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';

import type { FC } from 'react';

interface Props extends LinkProps {
  active?: boolean;
  href: LinkProps['href'];
  label: string;
}

const FilterItem: FC<Props> = ({ active = false, label, href }) => {
  return (
    <Link
      className={classNames(
        'flex items-center justify-center min-w-(--btn-md) h-(--btn-md) px-(--space-sm) rounded-[calc(var(--btn-md)/2)] font-bold tracking-[0.4px]',
        { 'bg-midnight-900 text-white': active },
      )}
      href={href}
      scroll={false}
    >
      <span className="blind">현재 선택된 카테고리명</span>
      {label}
    </Link>
  );
};

export default FilterItem;

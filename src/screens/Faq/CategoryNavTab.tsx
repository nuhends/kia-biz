import classNames from 'classnames';
import Link from 'next/link';

import type { FC } from 'react';
import type { TabType } from '@/src/api/faq';

// 탭 목록 타입 정의
type TabItem = {
  tab: TabType;
  label: string;
};

const TAB_LIST: TabItem[] = [
  {
    tab: 'CONSULT',
    label: '서비스 도입',
  },
  {
    tab: 'USAGE',
    label: '서비스 이용',
  },
];

const CategoryNavTab: FC = () => {
  return (
    <nav>
      <ul className="flex">
        {TAB_LIST.map((category: TabItem) => (
          <li key={category.tab} className="flex-1 [&]:last-of-type:ml-[-1px]">
            <Link
              className={classNames(
                'flex min-h-(--btn-xlg2) bg-white text-(length:--tab-fsize) border-[1px] border-midnight-100 items-center justify-center leading-[1.1] text-center p-[8px]',
                // {
                //   'bg-midnight-900! text-white border-midnight-900 font-bold':
                //     activeTab === category.tab,
                // },
              )}
              href={`?category=${category.tab}`}
            >
              {category.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNavTab;

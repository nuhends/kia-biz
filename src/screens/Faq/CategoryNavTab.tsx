import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useFaqContext } from './contexts/FaqContext';

import type { FC } from 'react';
import type { LinkProps } from 'next/link';
import type { TabType } from '@/src/api/faq';

export const FAQ_TAB_LIST = [
  {
    tab: 'CONSULT' as TabType,
    label: '서비스 도입',
  },
  {
    tab: 'USAGE' as TabType,
    label: '서비스 이용',
  },
] as const;

type TabItem = (typeof FAQ_TAB_LIST)[number];
type TabItemProps = {
  active: boolean;
  category: TabItem;
  href: LinkProps['href'];
};

const NavTabItem: FC<TabItemProps> = ({ active, category, href }) => {
  const { resetQuestionValue } = useFaqContext();

  return (
    <Link
      className={classNames(
        'flex min-h-(--btn-xlg2) p-[8px] bg-white text-(length:--tab-fsize) border-[1px] border-midnight-100 items-center justify-center leading-[1.1] text-center',
        { 'bg-midnight-900! text-white border-midnight-900 font-bold': active },
      )}
      href={href}
      scroll={false}
      onClick={resetQuestionValue}
    >
      {category.label}
    </Link>
  );
};

interface CategoryNavTabProps {
  initialTab: string;
}

const CategoryNavTab: FC<CategoryNavTabProps> = ({ initialTab }) => {
  const { pathname, query } = useRouter();
  const { page, categoryID, question, ...excludedQuery } = query;
  const currentTab = query.tab || initialTab;

  return (
    <nav>
      <ul className="flex">
        {FAQ_TAB_LIST.map((category) => (
          <li key={category.tab} className="flex-1 [&]:last-of-type:ml-[-1px]">
            <NavTabItem
              active={currentTab === category.tab}
              category={category}
              href={{ pathname, query: { ...excludedQuery, tab: category.tab } }}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNavTab;

import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';

import LogoKiaBiz from '@/public/svgs/logo_kiabiz.svg';
import LogoKiaBizSmall from '@/public/svgs/logo_kiabiz_sm.svg';
import useTopIntersectionObserver from '@/src/hooks/useTopIntersectionObserver';

import type { FC } from 'react';

const MENUS = [
  {
    label: '서비스 소개',
    href: '/Guide',
  },
  {
    label: '자주 묻는 질문',
    href: '/faq',
  },
  {
    label: '새소식',
    href: '/News',
  },
  {
    label: '상담문의',
    href: '/Counsel',
  },
];

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useTopIntersectionObserver({
    callback: ([entry]) => setIsScrolled(!entry.isIntersecting),
    options: { threshold: 0 },
  });

  return (
    <header
      className={classNames(
        'sticky z-100 top-[0] h-(--header-height) px-(--side-padding) bg-white',
        { 'shadow-[0_4px_32px_0_rgba(0,0,0,0.08)]!': isScrolled },
      )}
    >
      <div
        className={classNames(
          'flex flex-wrap items-center justify-between max-w-(--max-width) h-(--header-height) mx-auto',
        )}
      >
        <h1 className="flex h-full shrink-0">
          <Link className="flex items-center h-full" href="/">
            <span className="blind">Kia BIZ</span>
            <span
              aria-hidden="true"
              className={classNames(
                '[&>svg#logo]:hidden w-[110px] h-[40px] [&>svg]:w-full [&>svg]:h-full',
                'lg:[&>svg#logoSmall]:hidden lg:[&>svg#logo]:block lg:w-[140px] lg:h-full',
              )}
            >
              <LogoKiaBizSmall id="logoSmall" />
              <LogoKiaBiz id="logo" />
            </span>
          </Link>
        </h1>
        <nav
          className={classNames(
            { 'left-[0]!': isMenuOpen },
            'lg:flex-1 lg:justify-end lg:mr-[-20px] lg:lg:flex',
          )}
        >
          <ul className="flex lg:mt-[0]">
            {MENUS.map(({ label, href }) => (
              <li key={label} className={classNames('', 'lg:mx-[16px]')}>
                <Link
                  className={classNames(
                    'block',
                    'lg:px-[4px] lg:text-[18px] lg:font-bold lg:leading-(--header-height) lg:text-black',
                  )}
                  href={href}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          aria-expanded={isMenuOpen}
          className={classNames('w-[40px] h-[40px] border-[10px] border-transparent', 'lg:hidden!')}
          type="button"
          id="menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="blind">메뉴 {isMenuOpen ? '닫기' : '열기'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

import classNames from 'classnames';
import { useState } from 'react';

import IcTop from '@/public/svgs/ic_top.svg';
import useTopIntersectionObserver from '@/src/hooks/useTopIntersectionObserver';

import type { FC } from 'react';

const ToTopButton: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useTopIntersectionObserver({
    callback: ([entry]) => setIsScrolled(!entry.isIntersecting),
    options: { threshold: 0 },
  });

  const handleClickToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={classNames('sticky z-99 bottom-[0] left-[0] w-full pointer-events-none')}>
      <div
        className={classNames(
          'flex flex-col items-center absolute bottom-[24px] right-[16px] w-[40px] h-[40px]',
          'md:h-[48px]',
          'lg:bottom-[32px] lg:right-[24px]',
          'xl:bottom-[40px] xl:right-[32px] xl:h-[56px]',
        )}
      >
        <button
          aria-label="상단으로 스크롤 이동"
          className={classNames(
            'flex items-center justify-center w-[40px] h-full origin-[100%_100%] pointer-events-auto opacity-100 shadow-[0_4px_12px_0_rgba(0,0,0,0.12)] rounded-[50%] bg-white',
            'transition-[width, height, margin, opacity] duration-400 transition-(--cubic-bezier-primary)',
            'md:w-[48px] xl:w-[56px]',
            {
              'w-[0]! h-[0]! opacity-0!': !isScrolled,
            },
          )}
          onClick={handleClickToTop}
        >
          <span
            className={classNames(
              'w-[20px] h-[20px] [&>svg]:w-full h-full] md:w-[24px] md:h-[24px]',
              'lg:w-[28px] lg:h-[28px]',
            )}
          >
            <IcTop />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ToTopButton;

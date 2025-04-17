import classNames from 'classnames';

import { APP_INFO } from '@/src/constants/contents';

import type { ComponentProps, FC } from 'react';

const AppInfoSection: FC<ComponentProps<'section'>> = ({ className }) => {
  return (
    <section
      className={classNames(
        'flex flex-col p-[24px] items-center bg-gray-10 rounded-[16px] flex-wrap justify-center',
        'md:px-[32px]',
        'lg:p-[32px]',
        'xl:p-[40px]',
        className,
      )}
    >
      <h3
        className={classNames(
          'text-[16px] mb-[4px] leading-sm font-bold',
          'md:text-[20px] md:mb-[24px]',
          'lg:text-[24px]',
          'xl:text-[32px] xl:mb-[32px]',
        )}
      >
        <em>기아 비즈 App</em> 지금 만나보세요!
      </h3>
      <div className={classNames('flex flex-col w-full justify-center', 'md:flex-row')} role="list">
        {APP_INFO.map(({ logo, title, href }) => (
          <a
            className={classNames(
              'flex w-[264px] h-[48px] mt-[12px] items-center mx-auto text-[14px] bg-white rounded-[8px] font-bold justify-center',
              'md:text-[14px] md:h-[56px] md:mx-[8px]',
              'lg:w-[296px] lg:h-[60px] lg:text-[16px]',
              'xl:w-[392px] xl:h-[64px] xl:text-[18px] xl:mx-[16px]',
            )}
            href={href}
            target="_blank"
            role="listitem"
            rel="noopener noreferrer"
            key={title}
          >
            <span
              aria-hidden="true"
              className={classNames(
                'w-[24px] h-[24px] mr-[4px] [&>svg]:w-full [&>svg]:h-full',
                'lg:w-[28px] lg:h-[28px]',
                'xl:w-[32px] xl:h-[32px]',
              )}
            >
              {logo}
            </span>
            <span>{title}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default AppInfoSection;

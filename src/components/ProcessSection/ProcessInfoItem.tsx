import classNames from 'classnames';

import type { ComponentProps, FC, JSX } from 'react';

export interface ProcessInfo {
  label: string;
  description: string;
  icon: JSX.Element;
}

interface Props extends ProcessInfo, ComponentProps<'li'> {}

const ProcessInfoItem: FC<Props> = ({ icon, label, description }) => {
  return (
    <li
      className={classNames(
        'flex flex-1 mx-[calc(var(--space-md)/2)] leading-sm relative before:hidden',
        'before:content-[""] before:absolute before:top-1/2 before:left-[-12px] before:w-[24px] before:h-[24px] before:bg-[url("/svgs/ic_step_arrow.svg")] before:bg-no-repeat before:bg-center before:bg-contain before:-translate-y-1/2',
        'lg:flex-col lg:pl-[24px]',
        'lg:before:block lg:first-of-type:before:hidden',
      )}
    >
      <span className={classNames('flex-shrink-0 w-(--ic-xlg) h-(--ic-xlg) mr-[12px] lg:mb-[8px]')}>
        {icon}
      </span>
      <span className="flex flex-col">
        <em
          className={classNames(
            "text-[16px] before:content-[counter(li)_'.'] before:mr-[4px] [counter-increment:li] font-bold",
            'md:text-[18px] md:before:mr-[8px]',
          )}
        >
          {label}
        </em>
        <p
          className={classNames('mt-[4px] text-[14px] text-gray-700', 'md:text-[16px] md:mt-[8px]')}
        >
          {description}
        </p>
      </span>
    </li>
  );
};

export default ProcessInfoItem;

import IcNodata from '@/public/svgs/ic_nodata.svg';
import classNames from 'classnames';

import type { FC, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title: string;
  description: string;
}

const ErrorContent: FC<Props> = ({ title, description, children }) => {
  return (
    <div
      className={classNames(
        'pt-[80px] text-center break-all',
        'md:pt-[160px] md:px-[48px] md:pb-[80px]',
        'lg:pt-[80px] lg:pb-[0px]',
      )}
    >
      <span className="block w-(--ic-xxlg) h-(--ic-xxlg) mx-auto mb-(--space-md) [&>svg]:w-full [&>svg]:h-full">
        <IcNodata />
      </span>
      <h2 className="text-(length:--space-md2) leading-[1.3] font-bold">{title}</h2>
      <p
        className="leading-(--line-height-md) mt-(--space-xsm)"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className="flex justify-center mt-(--px-lg)">{children}</div>
    </div>
  );
};

export default ErrorContent;

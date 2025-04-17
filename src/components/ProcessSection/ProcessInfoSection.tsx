import classNames from 'classnames';

import ProcessInfoItem from './ProcessInfoItem';

import type { ComponentProps, FC } from 'react';
import type { ProcessInfo } from './ProcessInfoItem';

interface Props extends ComponentProps<'section'> {
  title: string;
  processInfo: ProcessInfo[];
}

const ProcessInfoSection: FC<Props> = ({ title, processInfo }) => {
  return (
    <section>
      <h3 className="heading-2">{title}</h3>
      <ol
        className={classNames(
          'flex flex-col mx-[calc(var(--space-md)*-1/2)] [counter-reset:li] [&>li:not(:first-child)]:mt-[20px]',
          'lg:flex-row',
        )}
      >
        {processInfo.map((item) => (
          <ProcessInfoItem key={item.label} {...item} />
        ))}
      </ol>
    </section>
  );
};

export default ProcessInfoSection;

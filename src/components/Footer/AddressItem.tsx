import classNames from 'classnames';

import type { ComponentProps, FC } from 'react';

export interface AddressInfo {
  title: string;
  description: string;
  hideTitle?: boolean;
}

interface Props extends Omit<ComponentProps<'div'>, 'title'>, AddressInfo {}

const AddressItem: FC<Props> = ({ title, description, hideTitle = false, className }) => {
  return (
    <div className={classNames('inline-flex mr-[12px] lg:mr-0 lg:ml-[12px]', className)}>
      <dt className={classNames('mr-[4px]', { hidden: hideTitle })}>{title}:</dt>
      <dd dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};

export default AddressItem;

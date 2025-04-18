import classNames from 'classnames';

import type { ComponentProps, FC } from 'react';

interface Props extends ComponentProps<'div'> {
  height?: number;
}

const LoadingIndicator: FC<Props> = ({ height = 320, className }) => (
  <div className={classNames('loading-indicator', className)} style={{ height: `${height}px` }}>
    <span />
    <p className="blind">데이터를 불러오는 중입니다.</p>
  </div>
);

export default LoadingIndicator;

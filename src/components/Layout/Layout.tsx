import classNames from 'classnames';

import type { ComponentProps, FC } from 'react';

const Layout: FC<ComponentProps<'main'>> = ({ children, className, ...rest }) => (
  <main
    className={classNames(
      'min-h-[calc(100vh-var(--header-height)-var(--footer-height))] px-(--side-padding) pb-(--bottom-padding)',
      className,
    )}
    {...rest}
  >
    <div className="max-w-[1240px] mx-auto">{children}</div>
  </main>
);

export default Layout;

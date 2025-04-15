import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

const Layout: FC<ComponentProps<'main'>> = ({ children, className, ...rest }) => (
  <main className={classNames('max-w-(--max-width) md:mx-auto my-[0]', className)} {...rest}>
    {children}
  </main>
);

export default Layout;

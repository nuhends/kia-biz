import type { NextPage } from 'next/types';
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<Props = Record<string, unknown>, InitialProps = Props> = NextPage<
  Props,
  InitialProps
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

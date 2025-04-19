import type { FC, PropsWithChildren } from 'react';

export interface ErrorScreenProps extends PropsWithChildren {}

const ErrorScreen: FC<ErrorScreenProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default ErrorScreen;

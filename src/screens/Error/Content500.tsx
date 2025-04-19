import LinkButton from '@/src/components/LinkButton';

import ErrorContent from './ErrorContent';

import type { FC } from 'react';

const Content500: FC = () => {
  return (
    <ErrorContent
      title="서버에 문제가 발생했습니다."
      description="현재 서버에 문제가 발생하였습니다.<br>잠시 후 다시 시도해 주세요."
    >
      <LinkButton href="/" type="tertiary" size="xlg">
        메인 페이지로 이동
      </LinkButton>
    </ErrorContent>
  );
};

export default Content500;

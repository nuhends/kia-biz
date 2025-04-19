import LinkButton from '@/src/components/LinkButton';

import ErrorContent from './ErrorContent';

import type { FC } from 'react';

const Content404: FC = () => {
  return (
    <ErrorContent
      title="페이지를 찾을 수 없습니다."
      description="현재 입력하신 주소의 페이지는 삭제되었거나, 다른 주소로 변경되었습니다.<br>주소를 다시 확인해 주세요."
    >
      <LinkButton href="/" type="tertiary" size="xlg">
        메인 페이지로 이동
      </LinkButton>
    </ErrorContent>
  );
};

export default Content404;

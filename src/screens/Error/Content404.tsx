import Link from 'next/link';

import type { FC } from 'react';

const Content404: FC = () => {
  return (
    <div className="error-info">
      <strong>페이지를 찾을 수 없습니다.</strong>
      <p>
        현재 입력하신 주소의 페이지는 삭제되었거나, 다른 주소로 변경되었습니다.
        <br />
        주소를 다시 확인해 주세요.
      </p>
      <div className="button-group">
        <Link href="/" className="btn-xlg btn-tertiary">
          메인 페이지로 이동
        </Link>
      </div>
    </div>
  );
};

export default Content404;

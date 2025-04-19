import Link from 'next/link';

import type { FC } from 'react';

const Content500: FC = () => {
  return (
    <div className="error-info">
      <strong>500 에러 서버와 연결 못함</strong>
      <p>어쩌고 저쩌고</p>
      <div className="button-group">
        <Link href="/" className="btn-xlg btn-tertiary">
          메인 페이지로 이동
        </Link>
      </div>
    </div>
  );
};

export default Content500;

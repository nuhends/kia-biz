import IconNoData from '@/public/svgs/ic_nodata.svg';

import type { FC } from 'react';

const FaqNoData: FC = () => (
  <div className="py-(--space-box2) border-t-2 border-b-[1px] border-midnight-900 text-center">
    <span
      aria-hidden="true"
      className="block w-(--ic-xlg2) h-(--ic-xlg2) mx-auto [&>svg]:w-full [&>svg]:h-full"
    >
      <IconNoData />
    </span>
    <p className="mt-(--space-xsm) leading-md break-keep text-gray-500">검색결과가 없습니다.</p>
  </div>
);

export default FaqNoData;

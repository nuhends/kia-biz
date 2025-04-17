import classNames from 'classnames';

import IconProcess01 from '@/public/svgs/ic_process01.svg';
import IconProcess02 from '@/public/svgs/ic_process02.svg';
import IconProcess03 from '@/public/svgs/ic_process03.svg';
import IconProcess04 from '@/public/svgs/ic_process04.svg';

import ProcessInfoItem from './ProcessInfoItem';

import type { ComponentProps, FC } from 'react';
import type { ProcessInfo } from './ProcessInfoItem';

const PROCESS_INFO: ProcessInfo[] = [
  {
    label: '문의 등록',
    description: '상담 문의를 등록해 주시면, 담당자가 맞춤형 상담을 제공합니다.',
    icon: <IconProcess01 />,
  },
  {
    label: '관리자 설정',
    description: '관리자 Web 접속 후 결제방식 및 회사정보를 설정합니다.',
    icon: <IconProcess02 />,
  },
  {
    label: '임직원 가입',
    description: '이용자 App에서 회원가입 후 소속 회사 인증을 진행합니다.',
    icon: <IconProcess03 />,
  },
  {
    label: '서비스 이용',
    description: '이용자 App에서 차량 예약을 하고 K존에서 바로 이용하세요!',
    icon: <IconProcess04 />,
  },
];

const ProcessInfoSection: FC<ComponentProps<'section'>> = () => {
  return (
    <section>
      <h3 className="heading-2">이용 프로세스 안내</h3>
      <ol
        className={classNames(
          'flex flex-col mx-[calc(var(--space-md)*-1/2)] [counter-reset:li] [&>li:not(:first-child)]:mt-[20px]',
          'lg:flex-row',
        )}
      >
        {PROCESS_INFO.map((item) => (
          <ProcessInfoItem key={item.label} {...item} />
        ))}
      </ol>
    </section>
  );
};

export default ProcessInfoSection;

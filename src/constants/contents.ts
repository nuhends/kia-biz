import { createElement } from 'react';

import IconProcess01 from '@/public/svgs/ic_process01.svg';
import IconProcess02 from '@/public/svgs/ic_process02.svg';
import IconProcess03 from '@/public/svgs/ic_process03.svg';
import IconProcess04 from '@/public/svgs/ic_process04.svg';

import type { ComponentType, ReactElement } from 'react';
import type { ProcessInfo } from '@/src/components/ProcessSection/ProcessInfoItem';

/**
 * SVG 컴포넌트를 React Element로 변환하는 함수
 * @param Icon - 변환할 SVG 컴포넌트
 * @returns React Element
 */
const createIconComponent = (Icon: ComponentType): ReactElement => createElement(Icon);

/** 이용 프로세스 정보 데이터 */
export const PROCESS_INFO: ProcessInfo[] = [
  {
    label: '문의 등록',
    description: '상담 문의를 등록해 주시면, 담당자가 맞춤형 상담을 제공합니다.',
    icon: createIconComponent(IconProcess01),
  },
  {
    label: '관리자 설정',
    description: '관리자 Web 접속 후 결제방식 및 회사정보를 설정합니다.',
    icon: createIconComponent(IconProcess02),
  },
  {
    label: '임직원 가입',
    description: '이용자 App에서 회원가입 후 소속 회사 인증을 진행합니다.',
    icon: createIconComponent(IconProcess03),
  },
  {
    label: '서비스 이용',
    description: '이용자 App에서 차량 예약을 하고 K존에서 바로 이용하세요!',
    icon: createIconComponent(IconProcess04),
  },
];

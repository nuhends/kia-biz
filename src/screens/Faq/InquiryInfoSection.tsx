import classNames from 'classnames';

import IconDownload from '@/public/svgs/ic_download.svg';
import IconTalk from '@/public/svgs/ic_talk.svg';
import IconWrite from '@/public/svgs/ic_write.svg';
import LinkButton from '@/src/components/LinkButton';
import { URLS } from '@/src/constants/meta';

import type { ComponentProps, FC } from 'react';

const InquiryInfoSection: FC<ComponentProps<'section'>> = () => {
  return (
    <section>
      <h3 className="heading-2">서비스 문의</h3>
      <div
        role="list"
        className={classNames(
          'flex flex-col mx-[calc(var(--space-md)*-1/2)]',
          '[&>a]:justify-start [&>a]:flex-1 [&>a]:my-[0] [&>a]:mx-[calc(var(--space-md)/2)] [&>a:not(:first-child)]:mt-[12px] [&>a:last-child]:mt-(--space-md) [&>a:last-child]:min-w-[calc(100%-var(--space-md))]',
          'md:flex-row md:flex-wrap md:[&>a:not(:first-child)]:mt-(--space-md) md:[&>a:not(:last-child)]:mt-[0] md:min-w-[calc(100%-var(--space-md))] md:[&>a]:justify-center',
          'lg:[&>a]:min-w-auto! lg:[&>a]:mt-[0]!',
        )}
      >
        <LinkButton
          aria-label="서비스 제안서 다운로드"
          download
          href="/downloads/service-proposal.pdf"
          type="tertiary"
          role="listitem"
          size="xxlg"
        >
          <IconDownload />
          <span>서비스 제안서 다운로드</span>
        </LinkButton>
        {/* 내부 링크로 변경되면 Next Link 컴포넌트로 변경 필요 */}
        <LinkButton href={URLS.COUNSEL} size="xxlg" type="tertiary" role="listitem">
          <IconWrite />
          <span>상담문의 등록하기</span>
        </LinkButton>
        <LinkButton
          href={URLS.KAKAO_CHANNEL}
          size="xxlg"
          type="tertiary"
          target="_blank"
          rel="noopener noreferrer"
          role="listitem"
        >
          <IconTalk />
          <span>
            카톡으로 문의하기 <em>ID : 기아 비즈</em>
          </span>
        </LinkButton>
      </div>
    </section>
  );
};

export default InquiryInfoSection;

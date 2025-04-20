import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';

import KiaLogo from '@/public/svgs/logo_kia.svg';
import { ADDRESS_INFO, URLS } from '@/src/constants/meta';
import TermsModal from '@/src/screens/Faq/TermsModal';

import Address from './Address';

import type { FC } from 'react';
import type { Term } from '@/src/utils/fetch/terms';

interface Props {
  terms: Term[];
}

const Footer: FC<Props> = ({ terms }) => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleOpenTerms = () => {
    setIsTermsOpen(true);
  };

  const handleCloseTerms = () => {
    setIsTermsOpen(false);
  };

  return (
    <>
      <footer className="px-(--side-padding) bg-midnight-900 text-gray-400">
        <div
          className={classNames(
            'flex flex-col justify-between max-w-(--max-width) mx-auto h-(--footer-height) pt-[18px] pb-[29px] text-(length:--font-md) leading-(--line-height)',
            'md:pt-[44px] md:pb-[34px]',
            'lg:flex-row-reverse lg:items-center lg:p-0',
          )}
        >
          <div>
            <div className="flex lg:justify-end lg:mb-[10px]" role="list">
              <Link
                className="text-white text-(length:--font-lg) font-bold leading-[48px] mr-[16px] lg:leading-(--line-height) lg:mr-[24px]"
                href={URLS.FULL_POLICY}
                target="_blank"
                role="listitem"
              >
                개인정보 처리방침
              </Link>
              <button
                className="text-white text-(length:--font-lg) hover:underline font-bold leading-[48px] lg:leading-(--line-height)"
                type="button"
                role="listitem"
                onClick={handleOpenTerms}
              >
                이용약관
              </button>
            </div>
            <Address addressInfo={ADDRESS_INFO} />
          </div>
          <div
            className={classNames(
              'lg:shrink-0 lg:w-[180px] xl:w-[250px]',
              '[&>svg]:h-[32px] md:[&>svg]:h-[48px] lg:[&>svg]:h-[56px]',
            )}
          >
            <KiaLogo aria-label="KIA Logo" />
            <p className="mt-[1px] lg:mt-[2px]">© 2023 KIA CORP. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      {terms && <TermsModal isOpen={isTermsOpen} onClose={handleCloseTerms} terms={terms} />}
    </>
  );
};

export default Footer;

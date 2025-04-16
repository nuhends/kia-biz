import classNames from 'classnames';
import Link from 'next/link';
import { FC, useState } from 'react';

import KiaLogo from '@/public/svgs/logo_kia.svg';
import { getTerms, Term } from '@/src/api/terms';
import { ADDRESS_INFO, URLS } from '@/src/constants/meta';
import TermsModal from '@/src/screens/Faq/TermsModal';

import Address from './Address';

const Footer: FC = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [termsData, setTermsData] = useState<Term[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenTerms = () => {
    setIsTermsOpen(true);
  };

  const handleCloseTerms = () => {
    setIsTermsOpen(false);
  };

  const fetchTermsData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getTerms('JOIN_SERVICE_USE');
      setTermsData(data);
      console.log('약관 데이터:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      console.error('약관 데이터 가져오기 오류:', err);
    } finally {
      setIsLoading(false);
    }
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
              <button
                className="text-white text-(length:--font-lg) hover:underline font-bold leading-[48px] lg:leading-(--line-height) ml-[16px] lg:ml-[24px]"
                type="button"
                role="listitem"
                onClick={fetchTermsData}
                disabled={isLoading}
              >
                {isLoading ? '로딩 중...' : '약관 데이터 가져오기'}
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
      {termsData && (
        <TermsModal isOpen={isTermsOpen} onClose={handleCloseTerms} terms={termsData} />
      )}
    </>
  );
};

export default Footer;

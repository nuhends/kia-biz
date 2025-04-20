import type { NextPageContext } from 'next';
import { match } from 'ts-pattern';

import { getTerms } from '@/src/utils/fetch/terms';
import Footer from '@/src/components/Footer/Footer';
import Header from '@/src/components/Header';
import Layout from '@/src/components/Layout/Layout';
import { DEFAULT_STATUS_CODE, ERROR_STATUS_CODES } from '@/src/constants/error';
import Content404 from '@/src/screens/Error/Content404';
import Content500 from '@/src/screens/Error/Content500';
import ErrorScreen from '@/src/screens/Error/ErrorScreen';

import type { ErrorProps } from '@/src/utils/error';
import type { Term } from '@/src/utils/fetch/terms/schema';
import type { NextPageWithLayout } from '@/src/components/Layout/types';
import type { ErrorScreenProps } from '@/src/screens/Error/ErrorScreen';

interface Props extends ErrorProps, ErrorScreenProps {
  terms: Term[];
}

const getStatusCode = (statusCode: number): number => {
  if (typeof window === 'undefined') {
    return statusCode || DEFAULT_STATUS_CODE;
  }

  const PrerenderDOM = document.getElementById('__NEXT_DATA__');

  try {
    const ssrData = JSON.parse(PrerenderDOM?.innerHTML || '{}');
    return ssrData.props.pageProps.statusCode || DEFAULT_STATUS_CODE;
  } catch {
    return DEFAULT_STATUS_CODE;
  }
};

const ErrorPage: NextPageWithLayout<Props> = ({ title, statusCode, ...errorScreenProps }) => {
  const status = getStatusCode(statusCode);

  const content = match({ statusCode: status, title })
    .with({ statusCode: ERROR_STATUS_CODES.BAD_REQUEST }, () => <Content500 />)
    .with({ statusCode: ERROR_STATUS_CODES.NOT_FOUND }, () => <Content404 />)
    .otherwise(() => <Content500 />);

  return <ErrorScreen {...errorScreenProps}>{content}</ErrorScreen>;
};

ErrorPage.getLayout = (page) => {
  const { terms } = page.props as Props;

  return (
    <>
      <Header />
      <Layout>{page}</Layout>
      {terms && <Footer terms={terms} />}
    </>
  );
};

ErrorPage.getInitialProps = async ({ res, err }: NextPageContext) => {
  const typeExtendedErr = err as unknown as ErrorProps & Error;
  const statusCode = (typeExtendedErr?.statusCode ||
    res?.statusCode ||
    DEFAULT_STATUS_CODE) as number;
  let terms: Term[] = [];

  try {
    terms = await getTerms({ termsClassID: 'JOIN_SERVICE_USE' });
  } catch (error) {
    console.error('약관 정보를 가져오는데 실패했습니다:', error);
    // 에러가 발생해도 나머지 프로세스는 진행
  }

  const defaultProps = { statusCode: 500, title: 'Internel Server Error', terms };

  return match({ statusCode })
    .with({ statusCode: 400 }, () => {
      return { ...defaultProps, statusCode: 400, title: '400 Error' };
    })
    .with({ statusCode: 404 }, () => {
      if (res) res.statusCode = 404;
      return { ...defaultProps, statusCode: 404, title: 'Not Found' };
    })
    .otherwise(() => {
      return defaultProps;
    });
};

export default ErrorPage;

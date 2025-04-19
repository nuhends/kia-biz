import Head from 'next/head';

import { getTerms } from '@/src/api/terms';
import Footer from '@/src/components/Footer/Footer';
import Header from '@/src/components/Header';
import Layout from '@/src/components/Layout/Layout';
import { META } from '@/src/constants/meta';
import NewsScreen from '@/src/screens/News/NewsScreen';

import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '@/src/components/Layout/types';
import type { Term } from '@/src/api/terms';

interface Props {
  terms: Term[];
}

const NewsPage: NextPageWithLayout<Props> = () => {
  return (
    <>
      <Head>
        <title>{META.NEWS.TITLE}</title>
        <meta name="title" content={META.NEWS.TITLE} />
        <meta property="og:title" content={META.NEWS.TITLE} />
      </Head>
      <NewsScreen />
    </>
  );
};

NewsPage.getLayout = (page) => {
  const { terms } = page.props as Props;

  return (
    <>
      <Header />
      <Layout>{page}</Layout>
      <Footer terms={terms} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const terms = await getTerms('JOIN_SERVICE_USE');

  return {
    props: {
      terms,
    },
  };
};

export default NewsPage;

import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';

import { getTerms, Term } from '@/src/api/terms';
import Footer from '@/src/components/Footer/Footer';
import Header from '@/src/components/Header';
import Layout from '@/src/components/Layout/Layout';
import { NextPageWithLayout } from '@/src/components/Layout/types';
import { META } from '@/src/constants/meta';
import FaqScreen from '@/src/screens/Faq/FaqScreen';

interface Props {
  terms: Term[];
}

const FaqPage: NextPageWithLayout<Props> = () => {
  return (
    <>
      <Head>
        <title>{META.FAQ.TITLE}</title>
        <meta name="title" content={META.FAQ.TITLE} />
        <meta property="og:title" content={META.FAQ.TITLE} />
      </Head>
      <FaqScreen />
    </>
  );
};

FaqPage.getLayout = (page) => {
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

export default FaqPage;

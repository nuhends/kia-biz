import Head from 'next/head';
import React from 'react';

import Footer from '@/src/components/Footer';
import Layout from '@/src/components/Layout/Layout';
import { NextPageWithLayout } from '@/src/components/Layout/types';
import { META } from '@/src/constants/meta';
import FaqScreen from '@/src/screens/Faq/FaqScreen';

interface Props {}

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

FaqPage.getLayout = (page) => (
  <Layout>
    {page}
    <Footer />
  </Layout>
);

export default FaqPage;

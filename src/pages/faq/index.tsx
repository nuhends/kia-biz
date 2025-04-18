import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React from 'react';

import { getFaqCategories } from '@/src/api/faq/getFaqCategories';
import { getTerms, Term } from '@/src/api/terms';
import Footer from '@/src/components/Footer/Footer';
import Header from '@/src/components/Header';
import Layout from '@/src/components/Layout/Layout';
import { NextPageWithLayout } from '@/src/components/Layout/types';
import { META } from '@/src/constants/meta';
import { FAQ_TAB_LIST } from '@/src/screens/Faq/CategoryNavTab';
import FaqScreen, { FaqScreenProps } from '@/src/screens/Faq/FaqScreen';

interface Props extends FaqScreenProps {
  terms: Term[];
}

const FaqPage: NextPageWithLayout<Props> = ({ categories, initialTab }) => {
  return (
    <>
      <Head>
        <title>{META.FAQ.TITLE}</title>
        <meta name="title" content={META.FAQ.TITLE} />
        <meta property="og:title" content={META.FAQ.TITLE} />
      </Head>
      <FaqScreen categories={categories} initialTab={initialTab} />
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { query } = context;
  const defaultTab = FAQ_TAB_LIST[0].tab;
  const initialTab = String(query?.tab || defaultTab);

  const [categories, terms] = await Promise.all([
    getFaqCategories(initialTab),
    getTerms('JOIN_SERVICE_USE'),
  ]);

  return {
    props: {
      categories,
      initialTab,
      terms,
    },
  };
};

export default FaqPage;

import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React from 'react';

import { getFaqCategories } from '@/src/api/faq/getFaqCategories';
import { getFaqs } from '@/src/api/faq/getFaqs';
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

const FaqPage: NextPageWithLayout<Props> = ({ categories, faqData, initialTab }) => {
  return (
    <>
      <Head>
        <title>{META.FAQ.TITLE}</title>
        <meta name="title" content={META.FAQ.TITLE} />
        <meta property="og:title" content={META.FAQ.TITLE} />
      </Head>
      <FaqScreen categories={categories} faqData={faqData} initialTab={initialTab} />
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

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const defaultTab = FAQ_TAB_LIST[0].tab;
  const initialTab = String(query?.tab || defaultTab);
  const categoryID = String(query?.categoryID || '');

  const [categories, terms, faqData] = await Promise.all([
    getFaqCategories(initialTab),
    getTerms('JOIN_SERVICE_USE'),
    getFaqs({
      tab: initialTab,
      ...(categoryID && { categoryID }),
    }),
  ]);

  return {
    props: {
      categories,
      faqData,
      initialTab,
      terms,
    },
  };
};

export default FaqPage;

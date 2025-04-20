import { getTerms } from '@/src/utils/fetch/terms';
import Footer from '@/src/components/Footer/Footer';
import Header from '@/src/components/Header';
import Layout from '@/src/components/Layout/Layout';
import HomeScreen from '@/src/screens/Home/HomeScreen';

import type { Term } from '@/src/utils/fetch/terms';
import type { NextPageWithLayout } from '@/src/components/Layout/types';
import type { GetServerSideProps } from 'next';

interface Props {
  terms: Term[];
}

const Home: NextPageWithLayout = () => {
  return <HomeScreen />;
};

Home.getLayout = (page) => {
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
  const terms = await getTerms({ termsClassID: 'JOIN_SERVICE_USE' });

  return {
    props: {
      terms,
    },
  };
};

export default Home;

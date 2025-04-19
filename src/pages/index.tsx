import Footer from '@/src/components/Footer/Footer';
import Header from '@/src/components/Header';
import Layout from '@/src/components/Layout/Layout';
import HomeScreen from '@/src/screens/Home/HomeScreen';

import type { NextPageWithLayout } from '@/src/components/Layout/types';
import type { Term } from '@/src/api/terms';

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

export default Home;

import '@/src/styles/globals.css';

import Head from 'next/head';

import NetworkErrorModal from '@/src/components/DialogModal/NetworkErrorModal';
import Layout from '@/src/components/Layout/Layout';
import { META } from '@/src/constants/meta';
import { NetworkErrorProvider } from '@/src/context/NetworkErrorContext';

import type { NextPageWithLayout } from '@/src/components/Layout/types';
import type { AppProps } from 'next/app';

type AppPropsWithLayout<T> = AppProps & {
  Component: NextPageWithLayout<T>;
};

interface Props {}

const App = ({ Component, pageProps }: AppPropsWithLayout<Props>) => {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content={META.THEME_COLOR} />
        <title>{META.COMMON.TITLE}</title>
        <meta name="description" content={META.COMMON.DESCRIPTION} />
        <meta name="title" content={META.COMMON.TITLE} />
        <meta name="keywords" content={META.COMMON.KEYWORDS} />
        <meta property="og:title" content={META.COMMON.TITLE} />
        <meta property="og:description" content={META.COMMON.DESCRIPTION} />
        <meta property="og:site_name" content={META.COMMON.TITLE} />
        <meta property="og:image" content="/images/wb_sns_default.jpg" />
        <meta property="og:url" content={META.URL} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <NetworkErrorProvider>
        <span aria-hidden id="top-anchor" />
        {getLayout(<Component {...pageProps} />)}
        <NetworkErrorModal />
      </NetworkErrorProvider>
    </>
  );
};

export default App;

import '@/src/styles/globals.css';

import Head from 'next/head';

import { META } from '@/src/constants/meta';

import type { AppProps } from 'next/app';
export default function App({ Component, pageProps }: AppProps) {
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
      <Component {...pageProps} />
    </>
  );
}

import { Layout, LayoutProp } from '@/components/common/Layout';
import Head from 'next/head';
import React from 'react';
import 'sanitize.css';
import '@/styles/common.scss';

const App = (props: LayoutProp) => {
  // TODO: Redux でタイトルなどのメタデータを管理する
  // そのときにここを書き換える
  const title: string | null = null;

  return (
    <>
      <Head>
        <title>{title ? `${title} - Shrimoon` : 'Shrimoon'}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout {...props} />
    </>
  );
};

export default App;
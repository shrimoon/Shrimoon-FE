import React from 'react';
import { AppInitialProps } from 'next/dist/next-server/lib/utils';
import { AppProps } from 'next/dist/next-server/lib/router/router';

export type LayoutProp = AppInitialProps & AppProps;

export const Layout: React.VFC<LayoutProp> = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

import React, { useEffect } from 'react';
import Head from 'next/head';
import { AppInitialProps, AppProps } from 'next/app';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-spinner-material';
import styled from '@emotion/styled';

import { RootState } from '@/store';
import { sync } from '@/store/authSlice';
import { useSelectorEx } from '@/hooks/useSelectorEx';
import { useGetApi } from '@/hooks/useApi';
import { setMeta } from '@/store/apiSlice';

const SpinnerWrapper = styled.div`
  position: fixed;
  top: 8px;
  right: 8px;
`;

export type LayoutProp = AppInitialProps & AppProps;

export const Layout: React.VFC<LayoutProp> = ({ Component, pageProps }) => {
  const title = useSelector<RootState>(state => state.head.title);

  const dispatch = useDispatch();

  // localStorage からセッションデータを持ってきて適用する
  useEffect(() => {
    dispatch(sync());
  }, []);

  const get = useGetApi();

  useEffect(() => {
    get('meta').then(res => {
      if (res.ok) dispatch(setMeta(res.response));
    });
  }, []);

  const isFetching = useSelectorEx(state => state.api.callingCount > 0);

  return (
    <>
      <Head>
        <title>{title ? `${title} - Shrimoon` : 'Shrimoon'}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <SpinnerWrapper>
        <Spinner radius={24} color={'var(--accent)'} stroke={2} visible={isFetching} />
      </SpinnerWrapper>
      <Component {...pageProps} />
    </>
  );
};

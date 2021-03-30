import React from 'react';
import { NextPage } from 'next';
import { Welcome } from '@/components/index/Welcome';
import { useSelectorEx } from '@/hooks/useSelectorEx';
import { Home } from '@/components/index/Home';

const IndexPage: NextPage = () => {
  const token = useSelectorEx(state => state.auth.token);
  return token === undefined ? <p>Loading...</p> : token ? <Home/> : <Welcome/>;
};

export default IndexPage;

import { Layout, LayoutProp } from '@/components/common/Layout';
import React from 'react';
import 'sanitize.css';
import '@/styles/common.scss';
import { Provider } from 'react-redux';
import store from '@/store';

const App = (props: LayoutProp) => {
  return (
    <Provider store={store}>
      <Layout {...props} />
    </Provider>
  );
};

export default App;
import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import { useSelectorEx } from '@/hooks/useSelectorEx';
import { Panel, Section } from '../common/Panel';
import { Button } from '../common/ui/Button';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/authSlice';

const $ = styled.div`
  padding: 5rem 2rem;
  max-width: 640px;
`;

export const Home: React.VFC = () => {
  const user = useSelectorEx(state => state.auth.myselfCache);

  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(setToken(null));
    location.reload();
  }, []);

  return !user ? <p>Oops!</p> : (
    <$ className="_vstack">
      <Panel>
        <Section>
          <h1>ユーザー情報</h1>
          <ul>
            <li>{user.profileName ?? user.name} @{user.name}</li>
            <li>ID {user.id}</li>
          </ul>
        </Section>
        <Section>
          <Button danger onClick={logout}>ログアウト</Button>
        </Section>
      </Panel>
    </$>
  );
};
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { MOBILE_BREAKPOINT } from '@/constants';
import { useGetApi, usePostApi } from '@/hooks/useApi';
import { ApiResponse } from '@/models/api-response';
import { setMyselfCache, setToken } from '@/store/authSlice';
import { checkPasswordStrength } from '@/utils/check-password-strength';
import { Panel, Section } from '../common/Panel';
import { Button } from '../common/ui/Button';
import { Input } from '../common/ui/Input';
import { css } from '@emotion/react';
import { useSelectorEx } from '@/hooks/useSelectorEx';

const $ = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(110deg, transparent, transparent 30%, var(--accent) 30%, var(--accent) 35%, transparent 35%, transparent);
  display: grid;
  grid-template-areas:
    "header timeline"
    "details details";
  grid-template-rows: 1fr 10rem;
  grid-template-columns: 1fr 30rem;
  border-bottom: 1px solid var(--divider);
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    display: flex;
    flex-direction: column;
  }
`;

const Left = styled.div`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    margin: 1rem;
    > div {
      width: 100%;
    }
  }
`;

const Right = styled.div`
  grid-area: timeline;
  padding: 5rem;
  overflow: hidden;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    display: none;
  }
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  border-right: 1px solid var(--fg);
  border-bottom: 1px solid var(--fg);
  margin: 0 auto;
  transform: rotate(45deg);
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    display: none;
  }
`;

const Details = styled.div`
  grid-area: details;
  text-align: center;
  opacity: 0.8;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    margin-top: auto;
    margin-bottom: 16px;
  }
`;

const ValidationView = styled.div`
  height: 0.7rem;
  font-size: 0.7rem;
  margin-left: 0.4rem;
  color: var(--success);
  &.error {
    color: var(--danger);
  }
  &.warn {
    color: var(--warning);
  }
`;

const panelStyle = css`
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    /* border: none;
    box-shadow: none;
    border-radius: 0; */
  }
`;

export type LoginMode = 'login' | 'signup';

export const Jumbotron: React.VFC<{
  loginMode: LoginMode;
  setLoginMode: (loginMode: LoginMode) => void;
}> = ({loginMode, setLoginMode}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [agreeTos, setAgreeTos] = useState(false);

  const post = usePostApi();
  const dispatch = useDispatch();

  const canLogin = useMemo(() => username && password, [username, password]);
  const passwordConfirmed = useMemo(() => password === passwordConfirm, [password, passwordConfirm]);
  const canSignup = useMemo(() => username && passwordConfirmed && agreeTos, [username, passwordConfirmed, agreeTos]);
  const strength = useMemo(() => password.length > 0 ? checkPasswordStrength(password) : '', [password]);
  const [strengthClassName, strengthText] = useMemo(() => {
    switch (strength) {
      case 'poor':
        return ['error', 'クソザコパスワード'];
      case 'weak':
        return ['error', '弱いパスワード'];
      case 'normal':
        return ['warn', '普通のパスワード'];
      case 'good':
        return ['', 'そこそこ強いパスワード'];
      case 'great':
        return ['', '非常に強いパスワード'];
      default:
        return ['', ''];
    }
  }, [strength, password]);

  const setAccountAndReload = useCallback((r: ApiResponse) => {
    if (r.ok) {
      dispatch(setToken(r.response.token));
      dispatch(setMyselfCache(r.response));
      window.location.reload();
    } else {
      alert('ERROR: ' + r.response);
    }
  }, []);

  const login = useCallback(() => {
    post('auth/' + username, { password }).then(setAccountAndReload);
  }, [username, password]);

  const createAccount = useCallback(() => {
    if (!passwordConfirmed) return;
    if (!agreeTos) return;
    post('users/new/' + username, { password }).then(setAccountAndReload);
  }, [username, password, passwordConfirmed, agreeTos]);

  const loginForm = useMemo(() => (
    <Section className="_vstack">
      <Input label="ユーザー名" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input label="パスワード" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button primary disabled={!canLogin} onClick={login}>ログイン</Button>
      <small>
        アカウントを持っていない場合は
        <a href="#" onClick={() => setLoginMode('signup')}>新規登録</a>
      </small>
    </Section>
  ), [username, password]);
  const signupForm = useMemo(() => (
    <Section className="_vstack">
      <Input label="ユーザー名" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input label="パスワード" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <ValidationView className={strengthClassName}>{strengthText}</ValidationView>
      <Input label="パスワード(確認)" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
      <ValidationView className={passwordConfirmed ? '' : 'error'}>
        {!password ? '' : passwordConfirmed ? 'パスワードが一致しました' : 'パスワードが一致しません'}
      </ValidationView>
      <div>
        <label>
          <input type="checkbox" checked={agreeTos} onChange={(e) => setAgreeTos(e.target.checked)} />
          利用規約に同意する
        </label>
      </div>
      <Button primary disabled={!canSignup} onClick={createAccount}>アカウント作成</Button>
      <small>
        既にアカウントを持っているなら
        <a href="#" onClick={() => setLoginMode('login')}>ログイン</a>
      </small>
    </Section>
  ), [username, password, passwordConfirm, agreeTos]);
  return (
    <$>
      <Left>
        <Panel css={panelStyle}>
          <Section>
            <h1>Shrimoon</h1>
            <p>始めよう。つながりを、あなたの手のひらに。</p>
          </Section>
          {loginMode === 'login' ? loginForm : signupForm}
        </Panel>
      </Left>
      <Right>
      </Right>
      <Details>
        <p>Shrimoonをもっと知りたい？</p>
        <Arrow />
      </Details>
    </$>
  );
};


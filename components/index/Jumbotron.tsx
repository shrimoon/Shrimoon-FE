import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useMemo, useState } from 'react';
import { Panel, panelStyle, Section } from '../common/Panel';
import { Button } from '../common/ui/Button';
import { Input } from '../common/ui/Input';

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
`;

const Left = styled.div`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Right = styled.div`
  grid-area: timeline;
  padding: 5rem;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  border-right: 1px solid var(--fg);
  border-bottom: 1px solid var(--fg);
  margin: 0 auto;
  transform: rotate(45deg);
`;

const Details = styled.div`
  grid-area: details;
  text-align: center;
  opacity: 0.8;
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
  const loginForm = useMemo(() => (
    <Section className="_vstack">
      <h2>ログイン</h2>
      <Input label="ユーザー名" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input label="パスワード" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button primary>ログイン</Button>
      <small>
        アカウントを持っていない場合は
        <a href="#" onClick={() => setLoginMode('signup')}>新規登録</a>
      </small>
    </Section>
  ), [username, password]);
  const signupForm = useMemo(() => (
    <Section className="_vstack">
      <h2>新規登録</h2>
      <Input label="ユーザー名" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input label="パスワード" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input label="パスワード(確認)" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
      <div>
        <label>
          <input type="checkbox" checked={agreeTos} onChange={(e) => setAgreeTos(e.target.checked)} />
          利用規約に同意する
        </label>
      </div>
      <Button primary>アカウント作成</Button>
      <small>
        既にアカウントを持っているなら
        <a href="#" onClick={() => setLoginMode('login')}>ログイン</a>
      </small>
    </Section>
  ), [username, password, passwordConfirm, agreeTos]);
  return (
    <$>
      <Left>
        <Panel>
          <Section>
            <h1>Shrimoon</h1>
            <p>始めよう。つながりを、あなたの手のひらに。</p>
          </Section>
          {loginMode === 'login' ? loginForm : signupForm}
          <Section>
            <small>
              Shrimoon 1.0.0-alpha.1
            </small>
          </Section>
        </Panel>
      </Left>
      <Right>
        
        <p>ここに何を置くかはまだ決めていない</p>
        <p>まあタイムラインとかお知らせとかじゃない？</p>
        <p>↑確定してから書け</p>
        <p>↑だって空白だと寂しいんだもん</p>
        <p>ちくわ大明神</p>
        <p>↑↑確かに</p>
        <p>誰だ今の</p>
      </Right>
      <Details>
        <p>Shrimoonをもっと知りたい？</p>
        <Arrow />
      </Details>
    </$>
  );
};


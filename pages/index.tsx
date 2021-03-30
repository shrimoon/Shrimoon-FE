import React, { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Jumbotron, LoginMode } from '@/components/index/Jumbotron';
import styled from '@emotion/styled';
import { Button } from '@/components/common/ui/Button';
import { MOBILE_BREAKPOINT } from '@/constants';
import { useSelectorEx } from '@/hooks/useSelectorEx';

const $ = styled.div`
  > section + section {
    padding-top: 0;
  }
`;

const Description = styled.section`
  padding: 4rem 8rem;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 2rem;
  }
`;

const GettingStarted = styled.footer`
  border-top: var(--divider);
  background: var(--panel);
  text-align: center;

  padding: 4rem 8rem;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 2rem;
  }
`;

const IndexPage: NextPage = () => {
  const [loginMode, setLoginMode] = useState<LoginMode>('login');

  const length = useSelectorEx(state => state.api.meta?.maxStatusLength ?? '???');

  const onCreateAccountButtonClicked = useCallback(() => {
    setLoginMode('signup');
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);
  return (
    <$>
      <Jumbotron loginMode={loginMode} setLoginMode={setLoginMode}/>
      <Description>
        <h1>使い慣れた操作性、新しい体験。</h1>
        <p>Shrimoonは一般的なミニブログサービスの操作性を受け継いだ癖の少ないインターフェイスで、あなたの「つぶやき」を邪魔しません。</p>
        <p>{length}文字であなたの「今」を伝えよう。</p>
      </Description>
      <Description>
        <h1>仲間と繋がろう、星を見上げよう。</h1>
        <p>趣味嗜好、世代などからあなたの興味に合うユーザーをおすすめします。もちろん、繋がるか否かはあなた次第です。</p>
        <p>
        「連合」を有効にすることで、Mastodon, Misskeyといった他のソーシャルメディアに属する「リモートユーザー」と繋がることもできます。
          <br />
        もちろん、面倒な手順は必要ありません。
        </p>
      </Description>
      <Description>
        <h1>長文を書く、短文を纏める。</h1>
        <p>Shrimoonのブログ機能なら、文字数制限無し、マルチメディアを効果的に活かした本格的なブログ記事を作成できます。</p>
        <p>普段のつぶやきを集めてブログ記事にすることもできるので、ブログを書いたことが無い方にとっても敷居が下がることでしょう。</p>
        <p>書いた記事はボタンひとつでフォロワーにシェアできます。</p>
      </Description>
      <Description>
        <h1>オープンソース、フリー。</h1>
        <p>Shrimoonはオープンソースです。アプリケーション開発のスキルがあれば、誰でも開発に参加し、また改造することもできます。</p>
        <p>また、誰でも自分だけのShrimoonインスタンスを建てて、広く公開し、管理できます。</p>
        <p><a href="https://join.shrimoon.net/">JoinShrimoon で他のインスタンスを探す</a></p>
      </Description>
      <GettingStarted>
        <h1>興味が湧きましたか？</h1>
        <p>いますぐアカウントを作成しよう。</p>
        <Button onClick={onCreateAccountButtonClicked}>アカウントを作成する</Button>
      </GettingStarted>
    </$>
  );
};

export default IndexPage;

import Head from 'next/head';
import { SpringValues } from '@react-spring/core';
import { ReactNode, forwardRef } from 'react';
import NextNprogress from 'nextjs-progressbar';

import { TEmotionProps } from '@types';

import { Header } from './Header';
import { Footer } from './Footer';
import { Content, StyledLayout } from './Layout.styled';

type TLayout = {
  withHeader?: boolean;
  withFooter?: boolean;
  layoutStyle?: SpringValues<{ transform: string }>;
  contentStyle?: TEmotionProps;
  children: ReactNode;
};

export const Layout = forwardRef<HTMLDivElement, TLayout>(
  (
    {
      withHeader = true,
      withFooter = true,
      layoutStyle,
      contentStyle,
      children,
    },
    ref
  ) => (
    <StyledLayout {...{ ref }} style={layoutStyle}>
      <Head>
        <title>NFT Crematorium</title>
      </Head>
      <NextNprogress
        color="linear-gradient(90deg, rgb(100, 126, 203) 0%, rgb(208, 20, 152) 100%)"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      {withHeader && <Header />}
      <Content {...{ contentStyle }}>{children}</Content>
      {withFooter && <Footer />}
    </StyledLayout>
  )
);

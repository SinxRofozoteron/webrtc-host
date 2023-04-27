import { type ReactNode } from 'react';
import Head from 'next/head';

import { Main } from './Main';
import { Header } from './header/Header';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

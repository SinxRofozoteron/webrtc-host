import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';

import { Layout } from '../src/components/shared/Layout';
import { AppWrapper } from '../src/components/wrappers';

import type { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <AppWrapper>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </AppWrapper>
  );
}

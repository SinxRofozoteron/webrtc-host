import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';

import { Layout } from '../src/components/common/Layout';
import { ThemeProvider, IntlProvider } from '../src/components/wrappers';

import type { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <IntlProvider locale="en">
      <ThemeProvider>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ThemeProvider>
    </IntlProvider>
  );
}

import '../styles/globals.css';

import { Layout } from '../src/components/common/Layout';
import { ThemeProvider, IntlProvider } from '../src/components/wrappers';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <IntlProvider locale="en">
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </IntlProvider>
  );
}

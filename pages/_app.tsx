import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { Layout } from '../components/common/Layout';
import { ThemeProvider, IntlProvider } from '../components/wrappers';

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

import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { Layout } from '../components/common/Layout';
import { ThemeProvider } from '../components/wrappers/themeProvider/ThemeProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

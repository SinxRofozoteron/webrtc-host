import '../styles/globals.css';

import { type ReactNode } from 'react';

import { AppWrapper } from '../src/wrappers';

import type { AppProps as DefaultAppProps } from 'next/app';

type AppProps = DefaultAppProps & {
  Component: DefaultAppProps['Component'] & {
    getLayout: (page: ReactNode) => ReactNode;
  };
};

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  return <AppWrapper>{getLayout(<Component {...pageProps} />)}</AppWrapper>;
}

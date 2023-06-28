'use client';
import { type ReactNode } from 'react';
import { Provider } from 'react-redux';

import { type RootStore, configureStore } from '../state/store';

import { IntlProvider } from './IntlProvider';
import { ThemeProvider } from './themeProvider/ThemeProvider';

type AppWrapperProps = {
  children: ReactNode;
  store?: RootStore;
};

export const AppWrapper = ({ children, store }: AppWrapperProps) => {
  const rootStore = store || configureStore();

  return (
    <Provider store={rootStore}>
      <IntlProvider locale="en">
        <ThemeProvider>{children}</ThemeProvider>
      </IntlProvider>
    </Provider>
  );
};

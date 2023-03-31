import { type ReactNode } from 'react';

import { IntlProvider } from './IntlProvider';
import { ThemeProvider } from './themeProvider/ThemeProvider';

type AppWrapperProps = {
  children: ReactNode;
};

export const AppWrapper = ({ children }: AppWrapperProps) => (
  <IntlProvider locale="en">
    <ThemeProvider>{children}</ThemeProvider>
  </IntlProvider>
);

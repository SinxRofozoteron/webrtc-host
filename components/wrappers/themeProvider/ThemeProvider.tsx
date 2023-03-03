import { ThemeProvider as ThemeProviderMui } from '@mui/material/styles';
import { ReactNode } from 'react';

import retroTheme from './retroTheme';

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <ThemeProviderMui theme={retroTheme}>{children}</ThemeProviderMui>
);

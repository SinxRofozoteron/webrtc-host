import { ThemeProvider as ThemeProviderMui } from '@mui/material/styles';
import { type ReactNode } from 'react';

import retroTheme from './mainTheme';

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <ThemeProviderMui theme={retroTheme}>{children}</ThemeProviderMui>
);

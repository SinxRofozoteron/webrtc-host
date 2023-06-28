import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  // eslint-disable-next-line
  interface SimplePaletteColorOptions {
    disabled?: string;
  }
  // eslint-disable-next-line
  interface PaletteColor {
    disabled?: string;
  }
}

const theme = createTheme({
  palette: {
    text: {
      primary: '#EFEFF0',
      secondary: '#362F3E',
      disabled: '#f6edde'
    },
    background: {
      paper: '#EFEFF0',
      default: '#362F3E'
    },
    secondary: {
      main: '#a29a94',
      light: '#ebedec',
      dark: '#827a7a'
    },
    primary: {
      main: '#9d545a',
      disabled: '#d0a7ab',
      light: '#d2d3d2',
      dark: '#9D8896'
    },
    info: {
      main: '#362f3e'
    },
    success: {
      main: '#649453'
    },
    warning: {
      main: '#e2841b'
    },
    error: {
      main: '#f44336'
    }
  }
});

theme.typography.h1 = {
  fontSize: '2rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.5rem'
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem'
  }
};

export default theme;

import { createTheme } from '@mui/material/styles';

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
    primary: {
      main: '#9d545a',
      light: '#AA9F95',
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

export default theme;

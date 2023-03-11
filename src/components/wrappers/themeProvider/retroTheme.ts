import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    text: {
      primary: '#EEDCBD',
      secondary: '#eecfbe',
      disabled: '#f6edde'
    },
    background: {
      default: '#B7A64E'
    },
    primary: {
      main: '#703600',
      light: '#ff9838',
      dark: '#381b00'
    },
    secondary: {
      light: '#ffa96b',
      main: '#D75A00',
      dark: '#6b2d00'
    }
  }
});

export default theme;

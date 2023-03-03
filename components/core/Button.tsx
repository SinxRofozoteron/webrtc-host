import ButtonMui from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const Button = styled(ButtonMui)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.light
  }
}));

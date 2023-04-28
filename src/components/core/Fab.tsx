import MuiFab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';

export const Fab = styled(MuiFab)(({ theme, ...props }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  height: '4rem',
  width: props.variant === 'extended' ? 'auto' : '4rem',
  [theme.breakpoints.up('sm')]: {
    height: '5rem',
    width: props.variant === 'extended' ? 'auto' : '5rem'
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.light
  }
}));

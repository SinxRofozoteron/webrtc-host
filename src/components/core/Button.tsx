import ButtonMui, { type ButtonProps as ButtonPropsMui } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

type ButtonProps = ButtonPropsMui & {
  maxWidth?: string;
};

export const Button = styled(ButtonMui, {
  shouldForwardProp: prop => prop !== 'maxWidth'
})<ButtonProps>(({ theme, ...props }) => ({
  gap: theme.spacing(0.5),
  width: '100%',
  maxWidth: props.maxWidth,
  color: theme.palette.text.primary,
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.secondary,
    borderColor: theme.palette.text.secondary
  },
  borderColor: theme.palette.text.primary,
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(2)
  },
  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(3)
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.primary.disabled,
    color: theme.palette.text.disabled
  }
}));

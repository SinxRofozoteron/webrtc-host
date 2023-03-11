import ModalMui, { type ModalProps as ModalPropsMui } from '@mui/material/Modal';
import Box, { type BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Container = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  position: 'fixed',
  height: '100%',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: theme.palette.secondary.main,
  width: '100%',
  maxWidth: 600,
  maxHeight: 500,
  [theme.breakpoints.between('sm', 'xl')]: {
    width: '50%',
    height: '50%'
  }
}));

type ModalProps = Omit<ModalPropsMui, 'children'> & Pick<BoxProps, 'children'>;

export const Modal = ({ children, ...props }: ModalProps) => (
  <ModalMui {...props}>
    <Container>{children}</Container>
  </ModalMui>
);

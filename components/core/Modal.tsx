import ModalMui, { ModalProps } from '@mui/material/Modal';
import Box from '@mui/material/Box';
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

export const Modal = ({ children, ...props }: ModalProps) => (
  <ModalMui {...props}>
    <Container>{children}</Container>
  </ModalMui>
);

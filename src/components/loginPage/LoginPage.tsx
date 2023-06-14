import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { GoogleButton } from './GoogleButton';

const StyledContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  width: '100vw',
  maxWidth: '100vw !important',
  backgroundColor: theme.palette.background.default
}));

export const LoginPage = () => {
  return (
    <StyledContainer>
      <Stack
        spacing={2}
        width="auto"
        alignItems="center"
        height="100vh"
        justifyContent="center">
        <GoogleButton />
      </Stack>
    </StyledContainer>
  );
};

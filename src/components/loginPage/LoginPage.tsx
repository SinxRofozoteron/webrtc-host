import Stack from '@mui/material/Stack';

import { PageContainer } from '../core';

import { GoogleButton } from './GoogleButton';

export const LoginPage = () => {
  return (
    <PageContainer>
      <Stack
        spacing={2}
        width="auto"
        alignItems="center"
        height="100vh"
        justifyContent="center">
        <GoogleButton />
      </Stack>
    </PageContainer>
  );
};

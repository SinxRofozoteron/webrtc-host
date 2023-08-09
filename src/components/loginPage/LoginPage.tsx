import Stack from '@rtcapp/webrtc-ui/build/Stack';

import { PageContainer } from '../shared';

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

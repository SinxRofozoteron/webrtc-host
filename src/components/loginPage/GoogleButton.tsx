import { FormattedMessage } from 'react-intl';
import GoogleIcon from '@mui/icons-material/Google';

import { Button } from '../core';

// Construct an oauth url
const BE_BASE_URL = process.env.NEXT_PUBLIC_BE_BASE_URL!;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const oauthUrl = new URL(`${BE_BASE_URL}/auth/google`);
oauthUrl.searchParams.set('success_redirect_url', BASE_URL);
oauthUrl.searchParams.set('failure_redirect_url', `${BASE_URL}/login`);
oauthUrl.searchParams.set('new_user_redirect_url', `${BASE_URL}/new-user`);

export const GoogleButton = () => {
  return (
    <Button
      href={oauthUrl.toString()}
      variant="outlined"
      maxWidth="300px"
      startIcon={<GoogleIcon />}>
      <FormattedMessage id="common.signIn.google" />
    </Button>
  );
};

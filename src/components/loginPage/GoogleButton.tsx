import { FormattedMessage } from 'react-intl';
import GoogleIcon from '@mui/icons-material/Google';

import { Button } from '../core';

import { getOAuthUrl } from './GoogleButton.utils';

// Construct an oauth url
const BE_BASE_URL = process.env.NEXT_PUBLIC_BE_BASE_URL!;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export const GoogleButton = () => {
  const oauthUrl = getOAuthUrl(BE_BASE_URL, BASE_URL);
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

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useIntl } from 'react-intl';
import { useSession, signIn, signOut } from 'next-auth/react';

import { RoundButton } from '../../core';

export const LoginButton = () => {
  const intl = useIntl();
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  const loginLabel = intl.formatMessage({ id: 'common.login' });
  const logoutLabel = intl.formatMessage({ id: 'common.logout' });

  return (
    <RoundButton label={session ? logoutLabel : loginLabel} onClick={handleClick}>
      {session ? <LogoutIcon /> : <LoginIcon />}
    </RoundButton>
  );
};

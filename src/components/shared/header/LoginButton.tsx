import LoginIcon from '@rtcapp/webrtc-ui/build/icons/Login';
import { useIntl } from 'react-intl';
import RoundButton from '@rtcapp/webrtc-ui/build/RoundButton';
import Link from 'next/link';

import { LOGIN_BTN_ID } from './constants';

export const LoginButton = () => {
  const intl = useIntl();

  const loginLabel = intl.formatMessage({ id: 'common.login' });
  // const logoutLabel = intl.formatMessage({ id: 'common.logout' });

  return (
    <RoundButton
      label={loginLabel}
      href="/login"
      id={LOGIN_BTN_ID}
      component={Link}
      icon={<LoginIcon />}
    />
  );
};

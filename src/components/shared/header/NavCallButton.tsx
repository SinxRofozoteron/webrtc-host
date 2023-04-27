import VideoChatIcon from '@mui/icons-material/VideoChat';
import { useIntl } from 'react-intl';

import { RoundButton } from '../../core';

export const NavCallButton = () => {
  const intl = useIntl();

  const label = intl.formatMessage({ id: 'header.nav.findConversation' });

  return (
    <RoundButton route="/connect" label={label}>
      <VideoChatIcon />
    </RoundButton>
  );
};

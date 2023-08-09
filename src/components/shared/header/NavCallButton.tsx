import VideoChatIcon from '@rtcapp/webrtc-ui/build/icons/VideoChat';
import RoundButton from '@rtcapp/webrtc-ui/build/RoundButton';
import { useIntl } from 'react-intl';

export const NavCallButton = () => {
  const intl = useIntl();

  const label = intl.formatMessage({ id: 'header.nav.findConversation' });

  return <RoundButton href="/connect" label={label} icon={<VideoChatIcon />} />;
};

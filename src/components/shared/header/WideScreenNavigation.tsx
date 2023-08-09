import { styled } from '@rtcapp/webrtc-ui/build/styles';
import { useIntl } from 'react-intl';

import { NavCallButton } from './NavCallButton';
import { WIDE_SCREEN_NAV_ID } from './constants';

const Navigation = styled('nav')`
  display: flex;
`;

const StyledUl = styled('ul')`
  list-style-type: none;
`;

export const WideScreenNavigation = () => {
  const intl = useIntl();

  const navigationLabel = intl.formatMessage({ id: 'header.nav' });

  return (
    <Navigation aria-label={navigationLabel} id={WIDE_SCREEN_NAV_ID}>
      <StyledUl>
        <li>
          <NavCallButton />
        </li>
      </StyledUl>
    </Navigation>
  );
};

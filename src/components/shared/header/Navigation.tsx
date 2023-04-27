import { styled } from '@mui/material/styles';
import { useIntl } from 'react-intl';

import { NavCallButton } from './NavCallButton';

const Navigation = styled('nav')`
  display: flex;
`;

export const AppNavigation = () => {
  const intl = useIntl();

  const navigationLabel = intl.formatMessage({ id: 'header.nav' });

  return (
    <Navigation aria-label={navigationLabel}>
      <ul>
        <li>
          <NavCallButton />
        </li>
      </ul>
    </Navigation>
  );
};

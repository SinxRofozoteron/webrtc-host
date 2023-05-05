import { styled } from '@mui/material/styles';

import { Z_INDEX_LEVELS } from '../../../constants';

import { LoginButton } from './LoginButton';
import { WideScreenNavigation } from './WideScreenNavigation';
import { LOGIN_BTN_ID, WIDE_SCREEN_NAV_ID, HEADER_MENU_ID } from './constants';
import { HeaderMenu } from './HeaderMenu';

const HeaderWrapper = styled('header')(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  width: '100%',
  padding: '10px',
  justifyContent: 'flex-start',
  zIndex: Z_INDEX_LEVELS.ALWAYS_VISIBLE,
  [theme.breakpoints.down('sm')]: {
    [`& #${LOGIN_BTN_ID}, & #${WIDE_SCREEN_NAV_ID}`]: {
      display: 'none'
    }
  },
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'space-between',
    padding: '15px',
    [`& #${HEADER_MENU_ID}`]: {
      display: 'none'
    }
  }
}));

export const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderMenu />
      <WideScreenNavigation />
      <LoginButton />
    </HeaderWrapper>
  );
};

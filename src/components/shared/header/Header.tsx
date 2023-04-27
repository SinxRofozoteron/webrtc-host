import { styled } from '@mui/material/styles';

import { LoginButton } from './LoginButton';
import { AppNavigation } from './Navigation';

const HeaderWrapper = styled('header')(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  width: '100%',
  padding: '5px',
  justifyContent: 'flex-start',
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'space-between',
    padding: '10px'
  }
}));

export const Header = () => {
  return (
    <HeaderWrapper>
      <AppNavigation />
      <LoginButton />
    </HeaderWrapper>
  );
};

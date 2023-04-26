import { styled } from '@mui/material/styles';

import { LoginButton } from './LoginButton';
import { AppNavigation } from './Navigation';

const HeaderWrapper = styled('header')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'space-between'
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

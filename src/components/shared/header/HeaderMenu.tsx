import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import { Fab } from '../../core';

import { LoginButton } from './LoginButton';
import { HEADER_MENU_ID } from './constants';
import { NavCallButton } from './NavCallButton';

const StyledMenu = styled(Menu)`
  & .MuiPaper-root {
    background-color: transparent;
    box-shadow: none;
    padding: none;
    left: 0 !important;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  padding-left: 10px;
  &:hover {
    background-color: transparent;
  }
`;

export const HeaderMenu = () => {
  const intl = useIntl();
  const menuAnchor = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const navigationLabel = intl.formatMessage({ id: 'header.nav' });

  const handleMenuOpen = () => setOpen(true);

  const handleMenuClose = () => setOpen(false);

  return (
    <>
      <Fab id={HEADER_MENU_ID} ref={menuAnchor} onClick={handleMenuOpen}>
        <MenuIcon />
      </Fab>
      <StyledMenu anchorEl={menuAnchor.current} open={open} onClose={handleMenuClose}>
        <StyledMenuItem onClick={handleMenuClose}>
          <LoginButton />
        </StyledMenuItem>
        <nav aria-label={navigationLabel}>
          <StyledMenuItem onClick={handleMenuClose}>
            <NavCallButton />
          </StyledMenuItem>
        </nav>
      </StyledMenu>
    </>
  );
};

import AppBar from '@mui/material/AppBar';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from '../../core/Button';
import { LoginModal } from '../LoginModal/LoginModal';

export const Header = () => {
  let [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  const toggleLoginModal = () => setLoginModalOpen(open => !open);

  return (
    <AppBar
      position="static"
      sx={{
        display: 'flex',
        alignItems: 'flex-end'
      }}>
      <Button
        sx={{ width: '10%', minWidth: 100, maxWidth: 150 }}
        onClick={toggleLoginModal}>
        <FormattedMessage id="common.login" />
      </Button>
      <LoginModal open={loginModalOpen} onClose={toggleLoginModal} />
    </AppBar>
  );
};

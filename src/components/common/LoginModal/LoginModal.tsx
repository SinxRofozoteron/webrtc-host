import { type ModalProps } from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';

import { Modal, FormInput, type FormInputProps } from '../../../../components/core';
import { Button } from '../../../../components/core';

type LoginModalProps = {
  open: ModalProps['open'];
  onClose: ModalProps['onClose'];
};

const TITLE_ID = 'login-modal-title';

export const LoginModal = ({ open, onClose }: LoginModalProps) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loginChangeHandler: FormInputProps['onChange'] = (event) => {
    setLogin(event.target.value);
  };
  const passwordChangeHandler: FormInputProps['onChange'] = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby={TITLE_ID}>
      <Grid container flexDirection="column" alignItems="center" gap={2}>
        <Grid>
          <Typography id={TITLE_ID} variant="h5" align="center">
            <FormattedMessage id="common.login" />
          </Typography>
        </Grid>
        <Grid>
          <FormInput
            id="login-input"
            labelIntlId="loginModal.loginInputLabel"
            error={false}
            value={login}
            onChange={loginChangeHandler}
          />
        </Grid>
        <Grid>
          <FormInput
            id="password-input"
            labelIntlId="loginModal.passwordInputLabel"
            error={false}
            value={password}
            onChange={passwordChangeHandler}
            type="password"
          />
        </Grid>
        <Grid container justifyContent="space-between">
          <Grid>
            <Button>
              <FormattedMessage id="common.signUp" />
            </Button>
          </Grid>
          <Grid>
            <Button>
              <FormattedMessage id="common.signIn" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useState, useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';

import { isEmail } from '../../utils';
import { Button, CircularProgress } from '../core';
import { useCreateUserMutation } from '../../state/apis/webRtcService';

import { verifyNotEmpty } from './helpers';
import { NewUserFormInput } from './NewUserFormInput';
import { type NewUserInfo } from './types';

const FIRST_NAME_INPUT_ID = 'first-name-input';
const LAST_NAME_INPUT_ID = 'last-name-input';
const USERNMAE_INPUT_ID = 'username-input';
const EMAIL_INPUT_ID = 'email-input';

const FormContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: '90%',
  maxWidth: '700px',
  height: '90%',
  maxHeight: '600px',
  borderRadius: '2rem',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
    borderRadius: '3rem'
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
    borderRadius: '4rem'
  }
}));

type NewUserFormProps = {
  query: NewUserInfo;
};

export const NewUserForm = ({ query }: NewUserFormProps) => {
  const [createUser, { isLoading, data, error, isSuccess }] = useCreateUserMutation();

  const router = useRouter();

  const [firstName, setFirstName] = useState(query.firstName || '');
  const [lastName, setLastName] = useState(query.lastName || '');
  const [username, setUsername] = useState(query.username || '');
  const [email, setEmail] = useState(query.email || '');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');

  // Handle response from the backend
  useEffect(() => {
    if (error) {
      // TODO: Implement better error handling
      console.log(error);
    }
    if (isSuccess) {
      router.push('/');
    }
  }, [error, data, router, isSuccess]);

  const verifyEmailInput = useCallback((value: string) => {
    verifyNotEmpty(setEmailError)(value);
    if (value && !isEmail(value)) {
      setEmailError('newUserPage.emailInput.incorrectEmailError');
    }
  }, []);

  const handleSubmit = () => {
    verifyNotEmpty(setFirstNameError)(firstName);
    verifyNotEmpty(setLastNameError)(lastName);
    verifyNotEmpty(setUsernameError)(username);
    verifyEmailInput(email);

    if (firstName && lastName && username && email) {
      createUser({
        username,
        firstName,
        lastName,
        email,
        googleId: query.googleId
      });
    }
  };

  return (
    <FormContainer container columnSpacing={3}>
      <Grid xs={12}>
        <Typography textAlign="center" variant="h1" color="secondary.light">
          <FormattedMessage id="newUserPage.register" />
        </Typography>
      </Grid>
      <Grid xs={12} sm={6} alignContent="center">
        <NewUserFormInput
          id={FIRST_NAME_INPUT_ID}
          initialValue={query.firstName || ''}
          onChange={value => setFirstName(value)}
          verifyInput={verifyNotEmpty(setFirstNameError)}
          errorIntlId={firstNameError}
          labelIntlId="newUserPage.firstNameInput.label"
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <NewUserFormInput
          onChange={value => setLastName(value)}
          verifyInput={verifyNotEmpty(setLastNameError)}
          errorIntlId={lastNameError}
          id={LAST_NAME_INPUT_ID}
          initialValue={query.lastName || ''}
          labelIntlId="newUserPage.lastNameInput.label"
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <NewUserFormInput
          onChange={value => setUsername(value)}
          verifyInput={verifyNotEmpty(setUsernameError)}
          errorIntlId={usernameError}
          id={USERNMAE_INPUT_ID}
          initialValue={query.username || ''}
          labelIntlId="newUserPage.usernameInput.label"
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <NewUserFormInput
          onChange={value => setEmail(value)}
          verifyInput={verifyEmailInput}
          errorIntlId={emailError}
          id={EMAIL_INPUT_ID}
          initialValue={query.email || ''}
          labelIntlId="newUserPage.emailInput.label"
        />
      </Grid>
      <Grid justifyContent="center" xs={12}>
        <Button
          onClick={handleSubmit}
          disabled={
            isLoading ||
            !!(firstNameError || lastNameError || usernameError || emailError)
          }>
          {isLoading ? (
            <CircularProgress color="text.secondary" />
          ) : (
            <FormattedMessage id="newUserPage.signUp" />
          )}
        </Button>
      </Grid>
    </FormContainer>
  );
};

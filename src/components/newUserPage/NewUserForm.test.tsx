import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import omit from 'lodash/omit';
import * as nextRouter from 'next/router';

import { AppWrapper } from '../../wrappers';
import messages from '../../locales';
import { useCreateUserMutation } from '../../state/apis/webRtcService';

import { NewUserForm } from './NewUserForm';
import { type NewUserInfo } from './types';

jest.mock('../../state/apis/webRtcService/endpoints/createUser');

describe('<NewUserForm />', () => {
  const user = userEvent.setup();

  const pushMock = jest.fn();
  const routerMock = { push: pushMock };
  // @ts-expect-error mismatch between mock router and actual router type
  jest.spyOn(nextRouter, 'useRouter').mockReturnValue(routerMock);

  describe('with query params', () => {
    const testQuery: NewUserInfo = {
      firstName: 'Test First Name',
      lastName: 'Test Last Name',
      email: 'testEmail@example.com',
      username: 'Test Username',
      googleId: 'testGoogleId'
    };

    const createUserMock = jest.fn();
    (useCreateUserMutation as jest.Mock).mockReturnValue([
      createUserMock,
      { isLoading: false, data: null, error: null, isSuccess: null }
    ]);

    beforeEach(() => {
      render(<NewUserForm query={testQuery} />, { wrapper: AppWrapper });
    });

    it.each(Object.entries(omit(testQuery, ['googleId'])))(
      'renders %s input with correct initial value',
      (_, initialValue) => {
        const input = screen.queryByDisplayValue(initialValue);
        expect(input).toBeVisible();
      }
    );

    it('calls createUser mutation trigger with correct values on submit', async () => {
      const signUpBtn = screen.getByRole('button');

      await user.click(signUpBtn);

      expect(createUserMock).toHaveBeenCalledTimes(1);
      expect(createUserMock).toHaveBeenCalledWith(testQuery);
    });
  });

  describe('without query params', () => {
    const testQuery: NewUserInfo = {
      googleId: 'testGoogleId'
    };

    beforeEach(() => {
      render(<NewUserForm query={testQuery} />, { wrapper: AppWrapper });
    });

    it('does not display errors on initial render', () => {
      const foundElements = screen.queryAllByTestId('error-helper-text');
      expect(foundElements).toHaveLength(0);
    });

    it(
      'displays errors after clicking on Sign Up button' + 'when all fields are empty',
      async () => {
        const signUpBtn = screen.getByRole('button');
        await user.click(signUpBtn);

        const foundElements = screen.queryAllByTestId('error-helper-text');
        expect(foundElements).toHaveLength(4);
      }
    );

    it('displays error when email is not valid', async () => {
      const expectedError = messages.en['newUserPage.emailInput.incorrectEmailError'];
      const input = screen.getByRole('textbox', { name: 'Email' });
      await user.type(input, 'invalidEmail');

      let error = screen.queryByText(expectedError);
      // Error should not be displayed before user navigates out of email input
      expect(error).not.toBeInTheDocument();

      fireEvent.blur(input);
      error = screen.queryByText(expectedError);
      expect(error).toBeVisible();
    });
  });
});

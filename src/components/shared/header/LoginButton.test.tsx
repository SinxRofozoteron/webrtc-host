import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as nextAuth from 'next-auth/react';

import { AppWrapper } from '../../wrappers';

import { LoginButton } from './LoginButton';

describe('LoginButton', () => {
  const user = userEvent.setup();

  const useSessionMock = jest
    .spyOn(nextAuth, 'useSession')
    // @ts-expect-error useSession return type mismatch
    .mockReturnValue({ data: true });
  const signInMock = jest.spyOn(nextAuth, 'signIn').mockImplementation();
  const signOutMock = jest.spyOn(nextAuth, 'signOut').mockImplementation();

  afterEach(jest.clearAllMocks);

  it('renders Login icon if signed out', () => {
    // @ts-expect-error useSession return type mismatch
    useSessionMock.mockReturnValueOnce({ data: null });

    render(
      <AppWrapper>
        <LoginButton />
      </AppWrapper>
    );

    const loginIcon = document.querySelector('svg');
    expect(loginIcon).toHaveAttribute('data-testid', 'LoginIcon');
  });

  it('has Login accesible label when signed out', () => {
    const expectedLabel = 'Login';
    // @ts-expect-error useSession return type mismatch
    useSessionMock.mockReturnValueOnce({ data: null });

    render(
      <AppWrapper>
        <LoginButton />
      </AppWrapper>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAccessibleName(expectedLabel);
  });

  it('calls signIn on click when signed out', async () => {
    // @ts-expect-error useSession return type mismatch
    useSessionMock.mockReturnValueOnce({ data: null });

    render(
      <AppWrapper>
        <LoginButton />
      </AppWrapper>
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(signInMock).toHaveBeenCalledTimes(1);
  });

  it('renders Logout icon if signed in', () => {
    render(
      <AppWrapper>
        <LoginButton />
      </AppWrapper>
    );

    const loginIcon = document.querySelector('svg');
    expect(loginIcon).toHaveAttribute('data-testid', 'LogoutIcon');
  });

  it('has Logout accesible label when signed in', () => {
    const expectedLabel = 'Logout';

    render(
      <AppWrapper>
        <LoginButton />
      </AppWrapper>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAccessibleName(expectedLabel);
  });

  it('calls signOut on click when signed in', async () => {
    render(
      <AppWrapper>
        <LoginButton />
      </AppWrapper>
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(signOutMock).toHaveBeenCalledTimes(1);
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as nextAuth from 'next-auth/react';

import { AppWrapper } from '../../wrappers';

import { HeaderMenu } from './HeaderMenu';

describe('<HeaderMenu />', () => {
  const user = userEvent.setup();

  // @ts-expect-error
  jest.spyOn(nextAuth, 'useSession').mockReturnValue({ data: null });

  beforeEach(() => {
    render(
      <AppWrapper>
        <HeaderMenu />
      </AppWrapper>
    );
  });

  it('does not render menu on initial render', () => {
    const menu = screen.queryByRole('menu');
    expect(menu).not.toBeInTheDocument();
  });

  it('renders menu on click', async () => {
    const button = screen.getByRole('button');

    await user.click(button);
    const menu = screen.queryByRole('menu');

    expect(menu).toBeVisible();
  });

  it('menu contains navigation with accessible name', async () => {
    const button = screen.getByRole('button');

    await user.click(button);
    const nav = screen.getByRole('navigation');

    expect(nav).toHaveAccessibleName();
  });
});

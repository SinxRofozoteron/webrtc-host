import { render, screen } from '@testing-library/react';

import { AppWrapper } from '../../wrappers';

import { GoogleButton } from './GoogleButton';

describe('<GoogleButton />', () => {
  const test_be_origin = 'http://googleButtonTestBE.com';

  class TestURL extends URL {
    constructor(...init: ConstructorParameters<typeof URL>) {
      const pathArr = (init[0] as string).split('/');
      pathArr[0] = test_be_origin;
      init[0] = pathArr.join('/');
      super(...init);
    }
  }

  beforeAll(() => {
    // @ts-expect-error
    delete window.URL;
    window.URL = TestURL;

    render(
      <AppWrapper>
        <GoogleButton />
      </AppWrapper>
    );
  });

  it('renders link with correct href attribute', () => {
    const expectedUrl = new URL(`<baseUrl>/auth/google`);
    expectedUrl.searchParams.set('success_redirect_url', 'undefined');
    expectedUrl.searchParams.set('failure_redirect_url', 'undefined/login');
    expectedUrl.searchParams.set('new_user_redirect_url', 'undefined/new-user');

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', expectedUrl.toString());
  });
});

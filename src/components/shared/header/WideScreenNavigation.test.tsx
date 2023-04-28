import { render, screen } from '@testing-library/react';

import { AppWrapper } from '../../wrappers';

import { WideScreenNavigation } from './WideScreenNavigation';

describe('WideScreenNavigation', () => {
  beforeAll(() => {
    render(
      <AppWrapper>
        <WideScreenNavigation />
      </AppWrapper>
    );
  });

  it('nav element has accessible name', () => {
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAccessibleName();
  });
});

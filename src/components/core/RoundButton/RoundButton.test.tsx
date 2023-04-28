import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AppWrapper } from '../../wrappers';

import { RoundButton } from './RoundButton';

describe('<RoundButton />', () => {
  const testLabel = 'RoundButton label';
  const testId = 'round-button-id';

  const user = userEvent.setup();

  afterEach(jest.clearAllMocks);

  describe('as button', () => {
    const onClickMock = jest.fn();

    let button: HTMLButtonElement | null;

    beforeEach(() => {
      render(
        <AppWrapper>
          <RoundButton onClick={onClickMock} label={testLabel} id={testId}>
            <div>Hello World</div>
          </RoundButton>
        </AppWrapper>
      );

      button = screen.queryByRole('button');
    });

    it('renders button', () => {
      expect(button).toBeVisible();
    });

    it('button has accessible name', () => {
      expect(button).toHaveAccessibleName(testLabel);
    });

    it('button has expected id', () => {
      expect(button).toHaveAttribute('id', testId);
    });

    it('calls onClick on click', async () => {
      await user.click(button!);
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('does not dispaly label on initial render', () => {
      const labelElement = screen.queryByText(testLabel);
      expect(labelElement).not.toBeVisible();
    });

    it('displays label on hover', async () => {
      await user.hover(button!);

      const labelElement = screen.queryByText(testLabel);
      expect(labelElement).toBeVisible();
    });
  });

  describe('as link', () => {
    const testRoute = '/happy-route';

    let link: HTMLLinkElement | null;

    beforeEach(() => {
      render(
        <AppWrapper>
          <RoundButton route={testRoute} label={testLabel} id={testId}>
            <div>Hello World</div>
          </RoundButton>
        </AppWrapper>
      );

      link = screen.queryByRole('link');
    });

    it('renders link', () => {
      expect(link).toBeVisible();
    });

    it('link has accessible name', () => {
      expect(link).toHaveAccessibleName(testLabel);
    });

    it('link has expected id', () => {
      expect(link).toHaveAttribute('id', testId);
    });

    it('link has expected href', () => {
      expect(link).toHaveAttribute('href', testRoute);
    });

    it('does not dispaly label on initial render', () => {
      const labelElement = screen.queryByText(testLabel);
      expect(labelElement).not.toBeVisible();
    });

    it('displays label on hover', async () => {
      await user.hover(link!);

      const labelElement = screen.queryByText(testLabel);
      expect(labelElement).toBeVisible();
    });
  });
});

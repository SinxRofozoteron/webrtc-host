import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AppWrapper } from '../shared';

import { NewUserFormInput } from './NewUserFormInput';

describe('<NewUserFormInput />', () => {
  const user = userEvent.setup();

  const testIntialValue = 'New User Form Input Test';
  const testErrorIntlId = 'newUserPage.error';
  const testLabelIntlId = 'newUserPage.usernameInput.label';

  const onChangeMock = jest.fn();
  const verifyInputMock = jest.fn();

  let inputElement: HTMLInputElement;

  beforeEach(() => {
    render(
      <NewUserFormInput
        id="test-id"
        initialValue={testIntialValue}
        onChange={onChangeMock}
        errorIntlId={testErrorIntlId}
        verifyInput={verifyInputMock}
        labelIntlId={testLabelIntlId}
      />,
      { wrapper: AppWrapper }
    );

    inputElement = screen.getByRole('textbox');
  });
  afterEach(jest.clearAllMocks);

  it('renders initial value', () => {
    expect(inputElement).toHaveValue(testIntialValue);
  });

  it.each([
    ['onChange', onChangeMock],
    ['verifyInput', verifyInputMock]
  ])('calls %s only on blur', async (_, mock) => {
    const expectedValue = 'Test New User Form';

    await user.clear(inputElement);
    await user.type(inputElement, expectedValue);

    expect(mock).not.toHaveBeenCalled();

    fireEvent.blur(inputElement);

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith(expectedValue);
  });

  it('calls verifyInput onChange during second input edit', async () => {
    const expectedValue = 'abc';
    // Focus on input
    await user.clear(inputElement);

    fireEvent.blur(inputElement);

    await user.type(inputElement, expectedValue);
    // 1 on blur and 3 onChange
    expect(verifyInputMock).toHaveBeenCalledTimes(4);
  });
});

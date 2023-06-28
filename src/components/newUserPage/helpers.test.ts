import { verifyNotEmpty } from './helpers';

describe('New User page helpers', () => {
  describe('verifyNotEmpty', () => {
    const setErrorMock = jest.fn();

    afterEach(setErrorMock.mockClear);

    it('calls setError with errorIntlId if empty value provided', () => {
      verifyNotEmpty(setErrorMock)('');
      expect(setErrorMock).toHaveBeenCalledTimes(1);
      expect(setErrorMock).toHaveBeenCalledWith('newUserPage.error');
    });

    it('calls setError with empty string if non-empty value provided', () => {
      verifyNotEmpty(setErrorMock)('non-empty error');
      expect(setErrorMock).toHaveBeenCalledTimes(1);
      expect(setErrorMock).toHaveBeenCalledWith('');
    });
  });
});

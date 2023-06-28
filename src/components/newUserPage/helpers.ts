export const verifyNotEmpty = (setError: (err: string) => void) => (value: string) => {
  if (!value) {
    setError('newUserPage.error');
  } else {
    setError('');
  }
};

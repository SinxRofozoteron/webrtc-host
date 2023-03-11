import { isEmail } from './email';

describe('isEmail', () => {
  it.each(['hello@', 'hello.world', '@gmail.com'])('returns false for %s', str => {
    const result = isEmail(str);
    expect(result).toBe(false);
  });
});

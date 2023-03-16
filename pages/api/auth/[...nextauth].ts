import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { axiosBackend } from '../../../src/services/axiosBackend';
import { isEmail } from '../../../src/utils';
import { type LoginCredentials } from '../../../src/types';

const authOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse
): NextAuthOptions => {
  return {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          login: { label: 'Username or password', type: 'text' },
          password: { label: 'Password', type: 'password' }
        },
        async authorize(credentials) {
          if (!credentials) {
            return null;
          }
          let creds: LoginCredentials = {
            username: credentials.login,
            password: credentials.password
          };
          // If login is email-like supply email as well
          // email-like login could potentially be a username as well
          // that's why we supply both email and username
          if (isEmail(credentials.login)) {
            creds.email = credentials.login;
          }

          try {
            const response = await axiosBackend.post('login', creds);

            const cookies = response.headers['set-cookie']!;
            res.setHeader('Set-Cookie', cookies);

            return response.data;
          } catch (err) {
            // TODO: Remove console.log
            console.error(err);
            return null;
          }
        }
      })
    ]
  };
};

const auth = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptionsCallback(req, res));
};

export default auth;

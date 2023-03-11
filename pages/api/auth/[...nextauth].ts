import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { axiosBackend } from '../../../services/axiosBackend';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username or password', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const response = axiosBackend.post('login', {});
        } catch (err) {}
      }
    })
  ]
};

export default NextAuth(authOptions);

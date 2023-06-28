import { webrtcApi } from '../webRtcApi';
import { type UserRole } from '../../../../types';

type CreatedUser = {
  user_id: string;
  user_role: UserRole;
};

type CreateUserQueryParams = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  googleId: string;
};

export const { useCreateUserMutation } = webrtcApi.injectEndpoints({
  endpoints: build => ({
    createUser: build.mutation<CreatedUser, CreateUserQueryParams>({
      query: params => ({
        method: 'POST',
        url: '/users',
        body: {
          username: params.username,
          first_name: params.firstName,
          last_name: params.lastName,
          email: params.email,
          google_id: params.googleId
        }
      })
      // transformResponse: (response: { data: CreatedUser }) => response.data
    })
  })
});

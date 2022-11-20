import { baseApi } from './baseApi';

// Define endpoints for users
const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation({
      query: userData => ({
        url: `/users/register`,
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: userData => ({
        url: `/users/login`,
        method: 'POST',
        body: userData,
      }),
    }),
    edit: builder.mutation({
      query: userData => ({
        url: `/users/edit`,
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation({
      query: userData => `/users/logout`,
    }),
    current: builder.query({
      query: () => `/users/current`,
      providesTags: ['User'],
    }),
    avatars: builder.mutation({
      query: userData => ({
        url: `/users/avatars`,
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useEditMutation,
  useLogoutMutation,
  useCurrentQuery,
  useAvatarsMutation,
} = usersApi;

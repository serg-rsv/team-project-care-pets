import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:5000/api/v1/users'; // local
// const BASE_URL = 'https://sk-care-pets.herokuapp.com/api/v1/users'; //herokuapp

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token = '' } = getState().auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: builder => ({
    register: builder.mutation({
      query: userData => ({
        url: `/register`,
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: userData => ({
        url: `/login`,
        method: 'POST',
        body: userData,
      }),
    }),
    edit: builder.mutation({
      query: userData => ({
        url: `/edit`,
        method: 'PATCH',
        body: userData,
      }),
    }),
    logout: builder.mutation({
      query: userData => `/logout`,
    }),
    current: builder.query({
      query: () => `/current`,
      // providesTags: ['Users'],
    }),
    avatars: builder.mutation({
      query: userData => ({
        url: `/avatars`,
        method: 'PATCH',
        body: userData,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useEditMutation,
  useLogoutMutation,
  useCurrentQuery,
  useAvatarsMutation,
} = usersApi;

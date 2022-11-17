import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// BASE_URL='http://localhost:500/api/v1' // local
const BASE_URL = 'https://sk-care-pets.herokuapp.com/api/v1/users'; //herokuapp

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // prepareHeaders: (headers, { getState }) => {
    //   const { token = '' } = getState().user;
    //   headers.set('Autorization', token);
    //   return headers;
    // },
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
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
    logout: builder.query({
      query: userData => `/logout`,
    }),
    current: builder.query({
      query: () => `/current`,
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
  useRegisterQuery,
  useLoginMutation,
  useEditQuery,
  useLogoutQuery,
  useCurrentQuery,
  useAvatarsQuery,
} = usersApi;

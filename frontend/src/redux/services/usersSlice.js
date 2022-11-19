import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:5000/api/v1/users'; // local
// const BASE_URL = 'https://sk-care-pets.herokuapp.com/api/v1/users'; //herokuapp

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
      headers.set(
        'authorization',
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzUzNDJmNWI1YzJjZDM4ZWYwMzIwYiIsImlhdCI6MTY2ODY3NTUyNH0.3Xk7hOSAgQHLaRseNxGwdt-mH0FyWvzosUl2J9epHP4`
      );

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
  useEditMutation,
  useLogoutQuery,
  useCurrentQuery,
  useAvatarsMutation,
} = usersApi;

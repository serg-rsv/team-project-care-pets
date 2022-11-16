import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//BASE_URL='https://sk-care-pets.herokuapp.com/api/v1'
const BASE_URL = `${process.env.BASE_URL}/users`;

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getTokenFromUserState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      //token from the state
      const token = getTokenFromUserState.token;

      if (token) {
        headers.set('authentication', `Bearer ${token}`);
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
      invalidatesTags: ['Users'],
    }),
    login: builder.mutation({
      query: userData => ({
        url: `/login`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Users'],
    }),
    edit: builder.mutation({
      query: userData => ({
        url: `/edit`,
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['Users'],
    }),
    logout: builder.query({
      query: userData => `/logout`,
      providesTags: ['Users'],
    }),
    current: builder.query({
      query: userData => `/current`,
      providesTags: ['Users'],
    }),
    avatars: builder.mutation({
      query: userData => ({
        url: `/avatars`,
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useRegisterQuery,
  useLoginQuery,
  useEditQuery,
  useLogoutQuery,
  useCurrentQuery,
  useAvatarsQuery,
} = usersApi;

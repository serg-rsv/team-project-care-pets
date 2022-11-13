import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { category } from '../../../backend/models/Notice';

export const noticesApi = createApi({
  reducerPath: 'notices',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  }),
  tagTypes: ['Notices'],
  endpoints: builder => ({
    fetchNotices: builder.query({
      query: () => ({ url: '/notices' }),
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Notices', id })),
              { type: 'Notices', id: 'LIST' },
            ]
          : [{ type: 'Notices', id: 'LIST' }],
    }),
    deleteNotice: builder.mutation({
      query: noticeId => ({
        url: `/notices/${noticeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notices'],
    }),
    createNotice: builder.mutation({
      query: ({
        namePet,
        dateOfBirth,
        breed,
        addPhoto,
        comments,
        theSex,
        price,
        location,
      }) => ({
        url: '/notices',
        method: 'POST',
        body: {
          name: namePet,
          birthday: dateOfBirth,
          breed: breed,
          sex: theSex,
          comments: comments,
          photo: addPhoto,
          price: price,
          location: location,
        },
      }),
      invalidatesTags: ['Notices'],
    }),
    getNoticeById: builder.query({
      query: noticeId => ({
        url: `'/notices/${noticeId}'`,
        method: 'GET',
      }),
    }),
    getPersonalNotice: builder.query({
      query: () => ({
        url: '/notices/personal',
        method: 'GET',
      }),
    }),
    getFavoritesNotice: builder.query({
      query: () => ({
        url: '/notices/favorites',
        method: 'GET',
      }),
    }),
    getFavoritesById: builder.query({
      query: noticeId => ({
        url: `/notices/favorites/${noticeId}`,
        method: 'GET',
      }),
    }),
    getNoticesBycategory: builder.query({
      query: category => ({
        url: `/notices/categories/${category}`,
        method: 'GET',
      }),
    }),
  }),
});

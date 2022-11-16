import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const noticesApi = createApi({
  reducerPath: 'notices',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sk-care-pets.herokuapp.com/api/v1',
    // baseUrl: 'http://localhost:5000/api/v1',
  }),
  tagTypes: ['Notices'],
  endpoints: builder => ({
    fetchNotices: builder.query({
      query: () => ({ url: '/notices' }),
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
export const {
  useFetchNoticesQuery,
  useDeleteNoticeMutation,
  useCreateNoticeMutation,
  useGetNoticeByIdQuery,
  useGetPersonalNoticeQuery,
  useGetFavoritesNoticeQuery,
  useGetFavoritesByIdQuery,
  useGetNoticesBycategoryQuery,
} = noticesApi;

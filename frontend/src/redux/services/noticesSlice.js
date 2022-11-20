import { baseApi } from './baseApi';

// Define endpoints for notices
const noticesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchNotices: builder.query({
      query: () => ({ url: '/notices' }),
      // providesTags: ['Notices'],
    }),
    deleteNotice: builder.mutation({
      query: noticeId => ({
        url: `/notices/${noticeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notices'],
    }),
    createNotice: builder.mutation({
      query: body => ({
        url: '/notices',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Notices'],
    }),
    getNoticeById: builder.query({
      query: noticeId => ({
        url: `/notices/${noticeId}`,
        method: 'GET',
      }),
    }),
    getPersonalNotice: builder.query({
      query: () => ({
        url: '/notices/personal',
        method: 'GET',
      }),
      providesTags: ['Notices'],
    }),
    getFavoritesNotice: builder.query({
      query: () => ({
        url: '/notices/favorites',
        method: 'GET',
      }),
      providesTags: ['Notices'],
    }),
    addFavoritesById: builder.mutation({
      query: noticeId => ({
        url: `/notices/favorites/${noticeId}`,
        method: 'GET',
      }),
      invalidatesTags: ['Notices', 'User'],
    }),
    deleteFavoritesById: builder.mutation({
      query: noticeId => ({
        url: `/notices/favorites/${noticeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User', 'Notices'],
    }),
    getNoticesByCategory: builder.query({
      query: category => ({
        url: `/notices/category/${category}`,
        method: 'GET',
      }),
      providesTags: ['Notices'],
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
  useAddFavoritesByIdMutation,
  useDeleteFavoritesByIdMutation,
  useGetNoticesByCategoryQuery,
} = noticesApi;

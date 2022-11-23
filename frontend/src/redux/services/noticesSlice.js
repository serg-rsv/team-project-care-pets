import { baseApi } from './baseApi';
import { urlGenerator } from '../../helpers/urlGenerator';

// Define endpoints for notices
const noticesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchNotices: builder.mutation({
      query: query => {
        const { title, category, location, name, page, limit } = query;
        if (title || category || location || name || page || limit) {
          const params = urlGenerator(query);
          return {
            url: `/notices?${params}`,
          };
        } else {
          return {
            url: '/notices',
          };
        }
      },
      transformResponse: response => response.data,
      providesTags: ['Notices'],
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
      query: query => {
        const { category, page, limit } = query;
        if (page) {
          return {
            url: `/notices/category/${category}?page=${page}&limit=${limit}`,
          };
        } else {
          return {
            url: `/notices/category/${category}`,
          };
        }
      },
      providesTags: ['Notices'],
    }),
  }),
});

export const {
  useFetchNoticesMutation,
  useDeleteNoticeMutation,
  useCreateNoticeMutation,
  useGetNoticeByIdQuery,
  useGetPersonalNoticeQuery,
  useGetFavoritesNoticeQuery,
  useAddFavoritesByIdMutation,
  useDeleteFavoritesByIdMutation,
  useGetNoticesByCategoryQuery,
} = noticesApi;

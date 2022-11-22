import { baseApi } from './baseApi';

const newsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNews: builder.query({
      query: query => {
        return {
          url: `/news${query ? '?title=' + query : ''}`,
        };
      },
      transformResponse: response => response.data,
      providesTags: ['News'],
    }),
    addNews: builder.mutation({
      query: body => ({
        url: '/news',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['News'],
    }),
  }),
});

export const { useGetNewsQuery, useAddNewsMutation } = newsApi;

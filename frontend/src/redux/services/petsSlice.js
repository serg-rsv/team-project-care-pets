import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const petsApi = createApi({
  reducerPath: 'pets',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sk-care-pets.herokuapp.com/api/v1',
    // baseUrl: 'http://localhost:5000/api/v1',
  }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
  tagTypes: ['Pets'],
  endpoints: builder => ({
    fetchPets: builder.query({
      query: () => ({ url: '/pets' }),
    }),
    createPet: builder.mutation({
      query: ({ namePet, dateOfBirth, breed, addPhoto, comments }) => ({
        url: '/pets',
        method: 'POST',
        body: {
          name: namePet,
          birthday: dateOfBirth,
          breed: breed,
          comments: comments,
          photoUrl: addPhoto,
        },
      }),
      invalidatesTags: ['Pets'],
    }),
    deletePet: builder.mutation({
      query: petId => ({
        url: `/pets/${petId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Pets'],
    }),
  }),
});
export const { useFetchPetsQuery, useDeletePetMutation, useCreatePetMutation } =
  petsApi;

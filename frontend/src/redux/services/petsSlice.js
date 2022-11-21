import { baseApi } from './baseApi';

// Define endpoints for pets
const petsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchPets: builder.query({
      query: () => ({ url: '/pets' }),
      providesTags: ['Pets'],
    }),
    createPet: builder.mutation({
      query: body => ({
        url: '/pets',
        method: 'POST',
        body,
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

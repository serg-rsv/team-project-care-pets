import { baseApi } from './baseApi';

// Define endpoints for pets
const petsApi = baseApi.injectEndpoints({
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

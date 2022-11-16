import { configureStore } from '@reduxjs/toolkit';
import { noticesApi } from './services/noticesSlice';
import { petsApi } from './services/petsSlice';
import { usersApi } from './usersSlice';
export const store = configureStore({
  reducer: {
    [noticesApi.reducerPath]: noticesApi.reducer,
    [petsApi.reducerPath]: petsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      noticesApi.middleware,
      petsApi.middleware,
      usersApi.middleware
    ),
});

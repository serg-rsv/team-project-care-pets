import { configureStore } from '@reduxjs/toolkit';
import { noticesApi } from '../../src/redux/noticesSlice';
import { usersApi } from './usersSlice';

export const store = configureStore({
  reducer: {
    [noticesApi.reducerPath]: noticesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(noticesApi.middleware, usersApi.middleware),
});


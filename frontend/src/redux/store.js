import { configureStore } from '@reduxjs/toolkit';
import { noticesApi } from '../../src/redux/noticesSlice';

export const store = configureStore({
  reducer: {
    [noticesApi.reducerPath]: noticesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(noticesApi.middleware),
});

import { configureStore } from '@reduxjs/toolkit';
import { noticesApi } from './services/noticesSlice';
import { petsApi } from './services/petsSlice';
import { usersApi } from './services/usersSlice';
import authReducer from './services/authSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'isLoggedin'],
};
const persistedUserReducer = persistReducer(authPersistConfig, authReducer);
export const store = configureStore({
  reducer: {
    [noticesApi.reducerPath]: noticesApi.reducer,
    [petsApi.reducerPath]: petsApi.reducer,
    auth: persistedUserReducer,

    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(noticesApi.middleware, petsApi.middleware, usersApi.middleware),
});
export const persistor = persistStore(store);

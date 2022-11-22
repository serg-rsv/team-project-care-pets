import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './services/baseApi';
import authReducer from './services/authSlice';
import noticesReducer from './noticesSlice';
import { modalSlice } from './services/modalSlice';
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
    modal: modalSlice.reducer,
    auth: persistedUserReducer,
    notices: noticesReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});
export const persistor = persistStore(store);

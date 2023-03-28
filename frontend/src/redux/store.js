import { configureStore } from '@reduxjs/toolkit';
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

import authReducer from './services/authSlice';
import languageReducer from './languageSlice';
import noticesReducer from './noticesSlice';
import { baseApi } from './services/baseApi';
import { modalSlice } from './services/modalSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'isLoggedIn'],
};

const languagePersistConfig = {
  key: 'language',
  storage,
};

const persistedUserReducer = persistReducer(authPersistConfig, authReducer);
const persistedLanguageReducer = persistReducer(
  languagePersistConfig,
  languageReducer
);

export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    auth: persistedUserReducer,
    language: persistedLanguageReducer,
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

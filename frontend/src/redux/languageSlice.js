import { createSlice } from '@reduxjs/toolkit';

import i18n from '../i18n/i18n';

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    currentLanguage: 'en',
  },
  reducers: {
    setLanguage: (state, { payload }) => {
      state.currentLanguage = payload;
      i18n.changeLanguage(payload);
    },
  },
});

// ACTIONS

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;

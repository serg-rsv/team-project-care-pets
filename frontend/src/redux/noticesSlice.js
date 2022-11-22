import { createSlice } from '@reduxjs/toolkit';

export const noticesSlice = createSlice({
  name: 'notices',
  initialState: {
    items: [],
  },
  reducers: {
    setNotices: (state, { payload }) => {
      state.items = payload;
    },
  },
});

// ACTIONS

export const { setNotices } = noticesSlice.actions;
export default noticesSlice.reducer;

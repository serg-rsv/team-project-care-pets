import { createSlice } from '@reduxjs/toolkit';

export const noticesSlice = createSlice({
  name: 'notices',
  initialState: {
    items: [],
    isLoadMore: true,
  },
  reducers: {
    setNotices: (state, { payload }) => {
      state.items = payload;
    },
    setIsLoadMore: (state, { payload }) => {
      state.isLoadMore = payload;
    },
  },
});

// ACTIONS

export const { setNotices, setIsLoadMore } = noticesSlice.actions;
export default noticesSlice.reducer;

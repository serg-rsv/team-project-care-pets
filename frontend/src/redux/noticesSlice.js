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
    setIsFavorite: (state, { payload }) => {
      const { _id, isFavorite } = payload;
      state.items.map(item =>
        item._id === _id ? (item.isFavorite = isFavorite) : item
      );
    },
  },
});

// ACTIONS

export const { setNotices, setIsLoadMore, setIsFavorite } =
  noticesSlice.actions;
export default noticesSlice.reducer;

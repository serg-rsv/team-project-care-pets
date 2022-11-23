import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoggedIn: false,
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
      state.isLoggedIn = true;
    },
    unsetToken: state => {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});
export const { setToken, unsetToken } = authSlice.actions;
export default authSlice.reducer;

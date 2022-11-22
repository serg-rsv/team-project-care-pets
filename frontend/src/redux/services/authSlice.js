import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoggedin: false,
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
      state.isLoggedin = true;
    },
    unsetToken: state => {
      state.token = null;
      state.isLoggedin = false;
    },
  },
});
export const { setToken, unsetToken } = authSlice.actions;
export default authSlice.reducer;

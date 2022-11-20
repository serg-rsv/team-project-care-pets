import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzdlNDdhMmFmMTIzNDRkNzk2NzFlNiIsImlhdCI6MTY2ODg5ODUyMH0.olYtEdnlXEjEda264niL0mXIeixI03Sn3wYmDw_1VYA',

    isLoggedin: true,
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
export const selectToken = state => state.auth.token;
export const selectIsLoggedIn = state => state.auth.isLoggedin;
export default authSlice.reducer;

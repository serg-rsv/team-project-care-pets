import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzUzNDJmNWI1YzJjZDM4ZWYwMzIwYiIsImlhdCI6MTY2ODY3NTUyNH0.3Xk7hOSAgQHLaRseNxGwdt-mH0FyWvzosUl2J9epHP4',
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

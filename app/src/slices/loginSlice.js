import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
};

const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState,
  reducers: {
    login: () => {
      console.log('login.....');
    },
    logout: () => {
      console.log('logout.....');
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;

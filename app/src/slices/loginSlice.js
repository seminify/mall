import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
};

const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      const data = action.payload;
      return {
        email: data.email,
      };
    },
    logout: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;

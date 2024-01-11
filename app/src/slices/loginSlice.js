import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginPost } from 'api/memberApi';

const initialState = {
  email: '',
};

export const login = createAsyncThunk('login', (param) => loginPost(param));

const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState,
  reducers: {
    logout: () => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const payload = action.payload;
        return payload;
      })
      .addCase(login.pending, () => {
        console.log('pending');
      })
      .addCase(login.rejected, () => {
        console.log('rejected');
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;

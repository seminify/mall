import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCartItems, postChangeCart } from 'api/cartApi';

const initialState = [];

export const postChangeCartAsync = createAsyncThunk(
  'postChangeCartAsync',
  (param) => postChangeCart(param),
);

export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync', () =>
  getCartItems(),
);

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCartItemsAsync.fulfilled, (state, action) => action.payload)
      .addCase(
        postChangeCartAsync.fulfilled,
        (state, action) => action.payload,
      );
  },
});

export default cartSlice.reducer;

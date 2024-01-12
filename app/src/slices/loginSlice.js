import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginPost } from 'api/memberApi';
import { getCookie, removeCookie, setCookie } from 'util/cookieUtil';

const initialState = {
  email: '',
};

export const loginPostAsync = createAsyncThunk('loginPostAsync ', (param) =>
  loginPost(param),
);

const loadMemberCookie = () => {
  const memberInfo = getCookie('member');
  if (memberInfo && memberInfo.nickname)
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  return memberInfo;
};

const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState: loadMemberCookie() || initialState,
  reducers: {
    login: (state, action) => {
      const payload = action.payload;
      setCookie('member', JSON.stringify(payload), 1);
      return payload;
    },
    logout: () => {
      removeCookie('member');
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        const payload = action.payload;
        if (!payload.error) setCookie('member', JSON.stringify(payload), 1);
        return payload;
      })
      .addCase(loginPostAsync.pending, () => {
        console.log('pending');
      })
      .addCase(loginPostAsync.rejected, () => {
        console.log('rejected');
      });
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;

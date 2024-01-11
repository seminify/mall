import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginPost } from 'api/memberApi';
import { getCookie, removeCookie, setCookie } from 'util/cookieUtil';

const initialState = {
  email: '',
};

export const login = createAsyncThunk('login', (param) => loginPost(param));

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
    logout: () => {
      removeCookie('member');
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const payload = action.payload;
        if (!payload.error) setCookie('member', JSON.stringify(payload), 1);
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

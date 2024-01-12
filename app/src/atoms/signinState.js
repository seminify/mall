import { atom } from 'recoil';
import { getCookie } from 'util/cookieUtil';

const initialState = {
  email: '',
  nickname: '',
  social: false,
  accessToken: '',
  refreshToken: '',
};

const loadMemberCookie = () => {
  const memberInfo = getCookie('member');
  if (memberInfo && memberInfo.nickname)
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  return memberInfo;
};

export default atom({
  key: 'signinState',
  default: loadMemberCookie() || initialState,
});

import axios from 'axios';

const client_id = 'client_id';
const redirect_uri = 'http://localhost:3000/member/kakao';
const auth_code_path = 'https://kauth.kakao.com/oauth/authrize';
const access_token_url = 'https://kauth.kakao.com/oauth/token';

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

export const getAccessToken = async (code) => {
  const params = {
    grant_type: 'authorization_code',
    client_id,
    redirect_uri,
    code,
  };
  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const res = await axios.post(access_token_url, params, headers);
  const accessToken = res.data.access_token;
  return accessToken;
};

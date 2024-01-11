import axios from 'axios';
import { getCookie, setCookie } from './cookieUtil';

const refreshJWT = async (accessToken, refreshToken) => {
  const res = await axios.get(
    `/api/member/refresh?refreshToken=${refreshToken}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  console.log(res.data);
  return res.data;
};

const jwtAxios = axios.create();

const requestOnFulfilled = (value) => {
  const memberInfo = getCookie('member');
  if (!memberInfo) {
    console.log('Member NOT FOUND');
    return Promise.reject({
      response: {
        data: {
          error: 'REQUIRE_LOGIN',
        },
      },
    });
  }
  const { accessToken } = memberInfo;
  value.headers.Authorization = `Bearer ${accessToken}`;
  return value;
};

const requestOnRejected = (error) => {
  console.log('request error');
  return Promise.reject(error);
};

const responseOnFulfilled = async (value) => {
  console.log(value);
  const data = value.data;
  if (data && data.error === 'ERROR_ACCESS_TOKEN') {
    const memberCookieValue = getCookie('member');
    const result = await refreshJWT(
      memberCookieValue.accessToken,
      memberCookieValue.refreshToken,
    );
    console.log('refreshJWT RESULT :' + result);
    memberCookieValue.accessToken = result.accessToken;
    memberCookieValue.refreshToken = result.refreshToken;
    setCookie('member', JSON.stringify(memberCookieValue), 1);
    const originalRequest = value.config;
    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
    return await axios(originalRequest);
  }
  return value;
};

const responseOnRejected = (error) => {
  console.log('response fail error');
  return Promise.reject(error);
};

jwtAxios.interceptors.request.use(requestOnFulfilled, requestOnRejected);
jwtAxios.interceptors.response.use(responseOnFulfilled, responseOnRejected);

export default jwtAxios;

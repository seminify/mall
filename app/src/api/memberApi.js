import axios from 'axios';

const host = '/api/member';

const config = {
  headers: {
    'Content-Type': 'x-www-form-urlencoded',
  },
};

export const loginPost = async (loginParam) => {
  const form = new FormData();
  form.append('username', loginParam.email);
  form.append('password', loginParam.pw);
  const res = await axios.post(`${host}/login`, form, config);
  return res.data;
};

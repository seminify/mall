import axios from 'axios';

const host = '/api/todo';

export const getList = async ({ page, size }) => {
  const res = await axios.get(`${host}/list`, {
    params: {
      page,
      size,
    },
  });
  return res.data;
};

export const getOne = async (tno) => {
  const res = await axios.get(`${host}/${tno}`);
  return res.data;
};

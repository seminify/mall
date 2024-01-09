import axios from 'axios';

const host = '/api/todo';

export const getOne = async (tno) => {
  const res = await axios.get(`${host}/${tno}`);
  return res.data;
};

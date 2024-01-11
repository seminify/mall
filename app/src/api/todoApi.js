import jwtAxios from 'util/jwtAxios';

const host = '/api/todo';

export const postAdd = async (todo) => {
  const res = await jwtAxios.post(`${host}`, todo);
  return res.data;
};

export const getList = async ({ page, size }) => {
  const res = await jwtAxios.get(`${host}/list`, {
    params: {
      page,
      size,
    },
  });
  return res.data;
};

export const getOne = async (tno) => {
  const res = await jwtAxios.get(`${host}/${tno}`);
  return res.data;
};

export const putOne = async (todo) => {
  const res = await jwtAxios.put(`${host}/${todo.tno}`, todo);
  return res.data;
};

export const deleteOne = async (tno) => {
  const res = await jwtAxios.delete(`${host}/${tno}`);
  return res.data;
};

import axios from 'axios';

const host = '/api/products';

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const postAdd = async (product) => {
  const res = await axios.post(`${host}`, product, config);
  return res.data;
};

export const getList = async ({ page, size }) => {
  const res = await axios.get(`${host}/list`, {
    params: {
      page,
      size,
    },
  });
  return res.data;
};

export const getOne = async (pno) => {
  const res = await axios.get(`${host}/${pno}`);
  return res.data;
};

export const putOne = async (pno, product) => {
  const res = await axios.put(`${host}/${pno}`, product, config);
  return res.data;
};

export const deleteOne = async (pno) => {
  const res = await axios.delete(`${host}/${pno}`);
  return res.data;
};

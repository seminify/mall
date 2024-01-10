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

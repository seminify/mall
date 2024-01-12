import jwtAxios from 'util/jwtAxios';

const host = '/api/cart';

export const getCartItems = async () => {
  const res = await jwtAxios.get(`${host}/items`);
  return res.data;
};

export const postChangeCart = async (cartitem) => {
  const res = await jwtAxios.post(`${host}/change`, cartitem);
  return res.data;
};

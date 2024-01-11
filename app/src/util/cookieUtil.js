import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days);
  return cookies.set(name, value, {
    expires,
  });
};

export const getCookie = (name) => cookies.get(name);

export const removeCookie = (name, path = '/') =>
  cookies.remove(name, {
    path,
  });

import { loginPost } from 'api/memberApi';
import { cartState } from 'atoms/cartState';
import signinState from 'atoms/signinState';
import { Navigate, useNavigate } from 'react-router';
import { createSearchParams } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { removeCookie, setCookie } from 'util/cookieUtil';

const useCustomLogin = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useRecoilState(signinState);
  const resetState = useResetRecoilState(signinState);
  const resetCartState = useResetRecoilState(cartState);
  const exceptionHandle = (exception) => {
    console.log(exception);
    const error = exception.response.data.error;
    const search = createSearchParams({
      error,
    }).toString();
    if (error === 'REQUIRE_LOGIN') {
      alert('로그인 해야만 합니다.');
      navigate({
        pathname: '/member/login',
        search,
      });
      return;
    }
    if (exception.response.data.error === 'ERROR_ACCESSDENIED') {
      alert('해당 메뉴를 사용할 수 있는 권한이 없습니다.');
      navigate({
        pathname: '/member/login',
        search,
      });
      return;
    }
  };
  const isLogin = loginState.email ? true : false;
  const saveAsCookie = (data) => {
    setCookie('member', JSON.stringify(data), 1);
    setLoginState(data);
  };
  const doLogin = async (loginParam) => {
    const result = await loginPost(loginParam);
    console.log(result);
    saveAsCookie(result);
    return result;
  };
  const doLogout = () => {
    removeCookie('member');
    resetState();
    resetCartState();
  };
  const moveToPath = (path) => {
    navigate(`${path}`, {
      replace: true,
    });
  };
  const moveToLogin = () => {
    navigate('/member/login', {
      replace: true,
    });
  };
  const moveToLoginReturn = () => (
    <Navigate
      to='/member/login'
      replace
    />
  );
  return {
    exceptionHandle,
    loginState,
    isLogin,
    saveAsCookie,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    moveToLoginReturn,
  };
};

export default useCustomLogin;

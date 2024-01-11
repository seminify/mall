import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { createSearchParams } from 'react-router-dom';
import { login, logout } from 'slices/loginSlice';

const useCustomLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const loginState = useSelector((state) => state.loginSlice);
  const isLogin = loginState.email ? true : false;
  const doLogin = async (loginParam) => {
    const action = await dispatch(login(loginParam));
    return action.payload;
  };
  const doLogout = () => {
    dispatch(logout());
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
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    moveToLoginReturn,
  };
};

export default useCustomLogin;

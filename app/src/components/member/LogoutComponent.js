import useCustomLogin from 'hooks/useCustomLogin';

const LogoutComponent = () => {
  const { doLogout, moveToPath } = useCustomLogin();
  const onClick = () => {
    doLogout();
    alert('로그아웃되었습니다.');
    moveToPath('/');
  };
  return (
    <div className='m-2 mt-10 border-2 border-red-200 p-4'>
      <div className='flex justify-center'>
        <div className='m-4 p-4 text-4xl font-extrabold text-red-500'>
          Logout Component
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full justify-center'>
          <div className='flex w-2/5 justify-center p-6 font-bold'>
            <button
              className='w-36 rounded bg-red-500 p-4 text-xl text-white'
              onClick={onClick}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutComponent;

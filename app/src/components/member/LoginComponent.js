import useCustomLogin from 'hooks/useCustomLogin';
import { useState } from 'react';

const initialState = {
  email: '',
  pw: '',
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState(initialState);
  const { doLogin, moveToPath } = useCustomLogin();
  const onChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({
      ...loginParam,
    });
  };
  const onClick = () => {
    doLogin(loginParam).then((data) => {
      console.log(data);
      if (data.error) alert('이메일과 패스워드를 다시 확인하세요');
      else {
        alert('로그인 성공');
        moveToPath('/');
      }
    });
  };
  return (
    <div className='m-2 mt-10 border-2 border-sky-200 p-4'>
      <div className='flex justify-center'>
        <div className='m-4 p-4 text-4xl font-extrabold text-blue-500'>
          Login Component
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-full p-3 text-left font-bold'>Email</div>
          <input
            className='w-full rounded-r border border-solid border-neutral-500 p-3 shadow-md'
            type='text'
            value={loginParam.email}
            name='email'
            onChange={onChange}
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-full p-3 text-left font-bold'>Password</div>
          <input
            className='w-full rounded-r border border-solid border-neutral-500 p-3 shadow-md'
            type='password'
            value={loginParam.pw}
            name='pw'
            onChange={onChange}
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full justify-center'>
          <div className='flex w-2/5 justify-center p-6 font-bold'>
            <button
              className='w-36 rounded bg-blue-500 p-4 text-xl text-white'
              onClick={onClick}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;

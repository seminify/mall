import { modifyMember } from 'api/memberApi';
import ResultModal from 'components/common/ResultModal';
import useCustomLogin from 'hooks/useCustomLogin';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const initialState = {
  email: '',
  pw: '',
  nickname: '',
};

const ModifyComponent = () => {
  const [member, setMember] = useState(initialState);
  const [result, setResult] = useState();
  const loginInfo = useSelector((state) => state.loginSlice);
  const { moveToLogin } = useCustomLogin();
  const callback = () => {
    setResult(null);
    moveToLogin();
  };
  const onChange = (e) => {
    member[e.target.name] = e.target.value;
    setMember({
      ...member,
    });
  };
  const onClick = () => {
    modifyMember(member).then((data) => {
      setResult('Modified');
    });
  };
  useEffect(() => {
    setMember({
      ...initialState,
      pw: 'ABCD',
    });
  }, [loginInfo]);
  return (
    <div className='mt-6'>
      {result ? (
        <ResultModal
          title='회원정보'
          content='정보수정완료'
          callback={callback}
        />
      ) : (
        <></>
      )}
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>Email</div>
          <input
            className='w-4/5 rounded-r border border-solid border-neutral-300 p-6 shadow-md'
            type='text'
            value={member.email}
            readOnly
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>Password</div>
          <input
            className='w-4/5 rounded-r border border-solid border-neutral-300 p-6 shadow-md'
            type='password'
            value={member.pw}
            name='pw'
            onChange={onChange}
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>Nickname</div>
          <input
            className='w-4/5 rounded-r border border-solid border-neutral-300 p-6 shadow-md'
            type='text'
            value={member.nickname}
            name='nickname'
            onChange={onChange}
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap justify-end'>
          <button
            className='m-2 w-32 rounded bg-blue-500 p-4 text-xl text-white'
            type='button'
            onClick={onClick}
          >
            Modify
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyComponent;

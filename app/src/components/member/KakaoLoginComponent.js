import { getKakaoLoginLink } from 'api/kakaoApi';
import { Link } from 'react-router-dom';

const KakaoLoginComponent = () => {
  const link = getKakaoLoginLink();
  return (
    <div className='flex flex-col'>
      <div className='text-center text-blue-500'>
        로그인시에 자동 가입처리 됩니다.
      </div>
      <div className='flex w-full justify-center'>
        <div className='m-6 w-3/4 rounded bg-yellow-500 p-2 text-center text-3xl font-extrabold text-white shadow-sm'>
          <Link to={link}>KAKAO LOGIN</Link>
        </div>
      </div>
    </div>
  );
};

export default KakaoLoginComponent;

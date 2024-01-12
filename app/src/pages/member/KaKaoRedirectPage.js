import { getAccessToken, getMemberWithAccessToken } from 'api/kakaoApi';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const KaKaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  useEffect(() => {
    getAccessToken(code).then((data) => {
      console.log(data);
      getMemberWithAccessToken(data).then((memberInfo) => {
        console.log(memberInfo);
      });
    });
  }, [code]);
  return (
    <div>
      <div>Kakao Login Redirect</div>
      <div>{code}</div>
    </div>
  );
};

export default KaKaoRedirectPage;

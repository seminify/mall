import { getAccessToken, getMemberWithAccessToken } from 'api/kakaoApi';
import useCustomLogin from 'hooks/useCustomLogin';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const KaKaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const { saveAsCookie, moveToPath } = useCustomLogin();
  useEffect(() => {
    getAccessToken(code).then((data) => {
      console.log(data);
      getMemberWithAccessToken(data).then((memberInfo) => {
        console.log(memberInfo);
        saveAsCookie(memberInfo);
        if (memberInfo && !memberInfo.social) {
          moveToPath('/');
        } else {
          moveToPath('../modify');
        }
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

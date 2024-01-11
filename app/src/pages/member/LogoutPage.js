import LogoutComponent from 'components/member/LogoutComponent';
import BasicMenu from 'components/menus/BasicMenu';

const LogoutPage = () => (
  <div className='fixed left-0 top-0 z-[1055] flex h-full w-full flex-col'>
    <BasicMenu />
    <div className='flex h-full w-full flex-wrap items-center justify-center border-2'>
      <LogoutComponent />
    </div>
  </div>
);

export default LogoutPage;

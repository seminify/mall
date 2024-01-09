import BasicLayout from 'layouts/BasicLayout';
import { Outlet } from 'react-router-dom';

const IndexPage = () => (
  <BasicLayout>
    <div className='m-2 flex w-full p-2'>
      <div className='m-1 w-20 p-2 text-center text-xl font-extrabold underline'>
        LIST
      </div>
      <div className='m-1 w-20 p-2 text-center text-xl font-extrabold underline'>
        ADD
      </div>
    </div>
    <div className='flex w-full flex-wrap'>
      <Outlet />
    </div>
  </BasicLayout>
);

export default IndexPage;

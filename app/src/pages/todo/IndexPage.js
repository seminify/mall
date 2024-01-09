import useCustomMove from 'hooks/useCustomMove';
import BasicLayout from 'layouts/BasicLayout';
import { Outlet, useNavigate } from 'react-router-dom';

const IndexPage = () => {
  const navigate = useNavigate();
  const { search } = useCustomMove();
  const moveToList = () => {
    navigate({
      pathname: 'list',
      search,
    });
  };
  const moveToAdd = () => {
    navigate({
      pathname: 'add',
      search,
    });
  };
  return (
    <BasicLayout>
      <div className='m-2 flex w-full p-2'>
        <div
          className='m-1 w-20 p-2 text-center text-xl font-extrabold underline'
          onClick={moveToList}
        >
          LIST
        </div>
        <div
          className='m-1 w-20 p-2 text-center text-xl font-extrabold underline'
          onClick={moveToAdd}
        >
          ADD
        </div>
      </div>
      <div className='flex w-full flex-wrap'>
        <Outlet />
      </div>
    </BasicLayout>
  );
};

export default IndexPage;

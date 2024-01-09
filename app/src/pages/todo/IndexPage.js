import BasicLayout from 'layouts/BasicLayout';
import {
  Outlet,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

const IndexPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page'))
    : 1;
  const size = searchParams.get('size')
    ? parseInt(searchParams.get('size'))
    : 10;
  const search = createSearchParams({
    page,
    size,
  }).toString();
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

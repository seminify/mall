import { useSearchParams } from 'react-router-dom';

const ListPage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page'))
    : 1;
  const size = searchParams.get('size')
    ? parseInt(searchParams.get('size'))
    : 10;
  return (
    <div className='w-full bg-white p-4'>
      <div className='text-3xl font-extrabold'>
        Todo List Page {page} --- {size}
      </div>
    </div>
  );
};

export default ListPage;

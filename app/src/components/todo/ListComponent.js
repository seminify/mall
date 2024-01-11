import { getList } from 'api/todoApi';
import FetchingModal from 'components/common/FetchingModal';
import PageComponent from 'components/common/PageComponent';
import useCustomLogin from 'hooks/useCustomLogin';
import useCustomMove from 'hooks/useCustomMove';
import { useEffect, useState } from 'react';

const initialState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const [data, setData] = useState(initialState);
  const [fetching, setFetching] = useState(false);
  const { refresh, page, size, moveToList, moveToRead } = useCustomMove();
  const { exceptionHandle } = useCustomLogin();
  useEffect(() => {
    setFetching(true);
    getList({
      page,
      size,
    })
      .then((data) => {
        console.log(data);
        setData(data);
        setFetching(false);
      })
      .catch((error) => exceptionHandle(error));
  }, [refresh, page, size]);
  return (
    <div className='mx-2 mt-10 border-2 border-blue-100'>
      {fetching ? <FetchingModal /> : <></>}
      <div className='mx-auto flex flex-wrap justify-center p-6'>
        {data.dtoList.map((todo) => (
          <div
            className='m-2 w-full min-w-[400px] rounded p-2 shadow-md'
            key={todo.tno}
            onClick={() => moveToRead(todo.tno)}
          >
            <div className='flex'>
              <div className='w-1/12 p-2 text-2xl font-extrabold'>
                {todo.tno}
              </div>
              <div className='m-1 w-8/12 p-2 text-xl font-extrabold'>
                {todo.title}
              </div>
              <div className='m-1 w-2/12 p-2 text-xl font-medium'>
                {todo.dueDate}
              </div>
            </div>
          </div>
        ))}
      </div>
      <PageComponent
        data={data}
        movePage={moveToList}
      />
    </div>
  );
};

export default ListComponent;

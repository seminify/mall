import { getOne } from 'api/todoApi';
import { useEffect, useState } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

const initialState = {
  tno: 0,
  title: '',
  writer: '',
  complete: false,
  dueDate: '',
};

const makeDiv = (title, value) => (
  <div className='flex justify-center'>
    <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
      <div className='w-1/5 p-6 text-right font-bold'>{title}</div>
      <div className='w-4/5 rounded-r border border-solid p-6 shadow-md'>
        {value}
      </div>
    </div>
  </div>
);

const ReadComponent = ({ tno }) => {
  const [todo, setTodo] = useState(initialState);
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
      pathname: '../list',
      search,
    });
  };
  const moveToModify = (tno) => {
    navigate({
      pathname: `../modify/${tno}`,
      search,
    });
  };
  useEffect(() => {
    getOne(tno).then((data) => {
      console.log(data);
      setTodo(data);
    });
  }, [tno]);
  return (
    <div className='m-2 mt-10 border-2 border-sky-200 p-4'>
      {makeDiv('Tno', todo.tno)}
      {makeDiv('Title', todo.title)}
      {makeDiv('Writer', todo.writer)}
      {makeDiv('Complete', todo.complete ? 'Completed' : 'Not Yet')}
      {makeDiv('Due Date', todo.dueDate)}
      <div className='flex justify-end p-4'>
        <button
          className='m-2 w-32 rounded bg-blue-500 p-4 text-xl text-white'
          type='button'
          onClick={moveToList}
        >
          List
        </button>
        <button
          className='m-2 w-32 rounded bg-red-500 p-4 text-xl text-white'
          type='button'
          onClick={() => moveToModify(tno)}
        >
          Modify
        </button>
      </div>
    </div>
  );
};

export default ReadComponent;

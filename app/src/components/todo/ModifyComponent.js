import { deleteOne, getOne, putOne } from 'api/todoApi';
import FetchingModal from 'components/common/FetchingModal';
import ResultModal from 'components/common/ResultModal';
import useCustomMove from 'hooks/useCustomMove';
import { useEffect, useState } from 'react';

const initialState = {
  tno: 0,
  title: '',
  writer: '',
  complete: false,
  dueDate: '',
};

const ModifyComponent = ({ tno }) => {
  const [todo, setTodo] = useState(initialState);
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);
  const { moveToList, moveToRead } = useCustomMove();
  const onChange = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({
      ...todo,
    });
  };
  const callback = () => {
    if (result === 'Deleted') moveToList();
    else moveToRead(tno);
  };
  const onChangeComplete = (e) => {
    const value = e.target.value;
    todo.complete = value === 'Y';
    setTodo({
      ...todo,
    });
  };
  const onClickDelete = () => {
    setFetching(true);
    deleteOne(tno).then((data) => {
      console.log(data);
      setResult('Deleted');
      setFetching(false);
    });
  };
  const onClickModify = () => {
    setFetching(true);
    putOne(todo).then((data) => {
      console.log(data);
      setResult('Modified');
      setFetching(false);
    });
  };
  useEffect(() => {
    setFetching(true);
    getOne(tno).then((data) => {
      setTodo(data);
      setFetching(false);
    });
  }, [tno]);
  return (
    <div className='m-2 mt-10 border-2 border-sky-200 p-4'>
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title='처리결과'
          content={result}
          callback={callback}
        />
      ) : (
        <></>
      )}
      <div className='mt-10 flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>TNO</div>
          <div className='w-4/5 rounded-r border border-solid bg-gray-100 p-6 shadow-md'>
            {todo.tno}
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>WRITER</div>
          <div className='w-4/5 rounded-r border border-solid bg-gray-100 p-6 shadow-md'>
            {todo.writer}
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>TITLE</div>
          <input
            className='w-4/5 rounded-r border border-solid border-neutral-300 p-6 shadow-md'
            type='text'
            value={todo.title}
            name='title'
            onChange={onChange}
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>DUEDATE</div>
          <input
            className='w-4/5 rounded-r border border-solid border-neutral-300 p-6 shadow-md'
            type='date'
            value={todo.dueDate}
            name='dueDate'
            onChange={onChange}
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>COMPLETE</div>
          <select
            className='m-1 rounded border-2 border-solid p-2'
            value={todo.complete ? 'Y' : 'N'}
            name='status'
            onChange={onChangeComplete}
          >
            <option value='Y'>Completed</option>
            <option value='N'>Not Yet</option>
          </select>
        </div>
      </div>
      <div className='flex justify-end p-4'>
        <button
          className='m-2 inline-block w-32 rounded bg-red-500 p-4 text-xl text-white'
          type='button'
          onClick={onClickDelete}
        >
          Delete
        </button>
        <button
          className='m-2 w-32 rounded bg-blue-500 p-4 text-xl text-white'
          type='button'
          onClick={onClickModify}
        >
          Modify
        </button>
      </div>
    </div>
  );
};

export default ModifyComponent;

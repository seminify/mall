import { postAdd } from 'api/todoApi';
import FetchingModal from 'components/common/FetchingModal';
import ResultModal from 'components/common/ResultModal';
import useCustomMove from 'hooks/useCustomMove';
import { useState } from 'react';

const initialState = {
  title: '',
  writer: '',
  dueDate: '',
};

const AddComponent = () => {
  const [todo, setTodo] = useState(initialState);
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);
  const { moveToList } = useCustomMove();
  const callBack = () => {
    setResult(null);
    moveToList();
  };
  const onChange = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({
      ...todo,
    });
  };
  const onClick = () => {
    setFetching(true);
    postAdd(todo)
      .then((result) => {
        console.log(result);
        setResult(result.TNO);
        setTodo({
          ...initialState,
        });
        setFetching(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className='m-2 mt-10 border-2 border-sky-200 p-4'>
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title='Add Result'
          content={`New ${result} Added`}
          callback={callBack}
        />
      ) : (
        <></>
      )}
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>TITLE</div>
          <input
            className='w-4/5 rounded-r border border-solid border-neutral-500 p-6 shadow-md'
            type='text'
            value={todo.title}
            name='title'
            onChange={onChange}
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>WRITER</div>
          <input
            className='w-4/5 rounded-r border border-solid border-neutral-500 p-6 shadow-md'
            type='text'
            value={todo.writer}
            name='writer'
            onChange={onChange}
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>DUEDATE</div>
          <input
            className='w-4/5 rounded-r border border-solid border-neutral-500 p-6 shadow-md'
            type='date'
            value={todo.dueDate}
            name='dueDate'
            onChange={onChange}
          />
        </div>
      </div>
      <div className='flex justify-end'>
        <div className='relative mb-4 flex flex-wrap items-stretch p-4'>
          <button
            className='w-36 rounded bg-blue-500 p-4 text-xl text-white'
            type='button'
            onClick={onClick}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;

import { postAdd } from 'api/productsApi';
import FetchingModal from 'components/common/FetchingModal';
import ResultModal from 'components/common/ResultModal';
import useCustomMove from 'hooks/useCustomMove';
import { useRef, useState } from 'react';

const initialState = {
  pname: '',
  price: 0,
  pdesc: '',
  files: [],
};

const AddComponent = () => {
  const [product, setProduct] = useState(initialState);
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);
  const { moveToList } = useCustomMove();
  const uploadRef = useRef();
  const callback = () => {
    setResult(null);
    moveToList();
  };
  const onChange = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({
      ...product,
    });
  };
  const onClick = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();
    formData.append('pname', product.pname);
    formData.append('price', product.price);
    formData.append('pdesc', product.pdesc);
    for (let i = 0; i < files.length; i++) formData.append('files', files[i]);
    setFetching(true);
    postAdd(formData).then((data) => {
      setResult(data.RESULT);
      setFetching(false);
    });
  };
  return (
    <div className='m-2 mt-10 border-2 border-sky-200 p-4'>
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title='Product Add Result'
          content={`${result}번 등록 완료`}
          callback={callback}
        />
      ) : (
        <></>
      )}
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>Product Name</div>
          <input
            className='w-4/5 rounded-r border border-solid border-neutral-300 p-6 shadow-md'
            type='text'
            value={product.pname}
            name='pname'
            onChange={onChange}
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>Price</div>
          <input
            className='w-4/5 rounded-r border border-solid border-neutral-300 p-6 shadow-md'
            type='number'
            value={product.price}
            name='price'
            onChange={onChange}
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>Desc</div>
          <textarea
            className='w-4/5 resize-y rounded-r border border-solid border-neutral-300 p-6 shadow-md'
            rows='4'
            value={product.pdesc}
            name='pdesc'
            onChange={onChange}
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>Files</div>
          <input
            className='w-4/5 rounded-r border border-solid border-neutral-300 p-6 shadow-md'
            type='file'
            multiple
            ref={uploadRef}
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

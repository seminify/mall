import { deleteOne, getOne, putOne } from 'api/productsApi';
import FetchingModal from 'components/common/FetchingModal';
import ResultModal from 'components/common/ResultModal';
import useCustomMove from 'hooks/useCustomMove';
import { useEffect, useRef, useState } from 'react';

const initialState = {
  pname: '',
  price: 0,
  pdesc: '',
  delFlag: false,
  uploadFileNames: [],
};

const ModifyComponent = ({ pno }) => {
  const [product, setProduct] = useState(initialState);
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);
  const { moveToList, moveToRead } = useCustomMove();
  const uploadRef = useRef();
  const callback = () => {
    if (result === 'Modified') moveToRead(pno);
    else moveToList();
  };
  const onChange = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({
      ...product,
    });
  };
  const onClickImages = (imageName) => {
    const resultFileNames = product.uploadFileNames.filter(
      (fileName) => fileName !== imageName,
    );
    product.uploadFileNames = resultFileNames;
    setProduct({
      ...product,
    });
  };
  const onClickModify = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();
    formData.append('pname', product.pname);
    formData.append('price', product.price);
    formData.append('pdesc', product.pdesc);
    formData.append('delFlag', product.delFlag);
    for (let i = 0; i < product.uploadFileNames.length; i++)
      formData.append('uploadFileNames', product.uploadFileNames[i]);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    setFetching(true);
    putOne(pno, formData).then((data) => {
      setResult('Modified');
      setFetching(false);
    });
  };
  const onClickDelete = () => {
    setFetching(true);
    deleteOne(pno).then((data) => {
      setResult('Deleted');
      setFetching(false);
    });
  };
  useEffect(() => {
    setFetching(true);
    getOne(pno).then((data) => {
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);
  return (
    <div className='m-2 mt-10 border-2 border-sky-200 p-4'>
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title={`${result}`}
          content='정상적으로 처리되었습니다.'
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
          <div className='w-1/5 p-6 text-right font-bold'>DELETE</div>
          <select
            className='w-4/5 rounded-r border border-solid border-neutral-300 p-6 shadow-md'
            name='delFlag'
            onChange={onChange}
          >
            <option value={false}>사용</option>
            <option value={true}>삭제</option>
          </select>
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
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>Images</div>
          <div className='flex w-4/5 flex-wrap items-start justify-center'>
            {product.uploadFileNames.map((uploadFileName, i) => (
              <div
                className='flex w-1/3 flex-col justify-center'
                key={i}
              >
                <button
                  className='bg-blue-500 text-3xl text-white'
                  type='button'
                  onClick={() => onClickImages(uploadFileName)}
                >
                  DELETE
                </button>
                <img
                  src={`/api/products/view/s_${uploadFileName}`}
                  alt='img'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-end p-4'>
        <button
          className='m-2 w-32 rounded bg-red-500 p-4 text-xl text-white'
          type='button'
          onClick={onClickDelete}
        >
          Delete
        </button>
        <button
          className='m-2 inline-block w-32 rounded bg-orange-500 p-4 text-xl text-white'
          type='button'
          onClick={onClickModify}
        >
          Modify
        </button>
        <button
          className='m-2 w-32 rounded bg-blue-500 p-4 text-xl text-white'
          type='button'
          onClick={moveToList}
        >
          List
        </button>
      </div>
    </div>
  );
};

export default ModifyComponent;

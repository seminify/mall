import { getList } from 'api/productsApi';
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
      <div className='mx-auto flex flex-wrap p-6'>
        {data.dtoList.map((product) => (
          <div
            className='w-1/2 rounded border-2 p-1 shadow-md'
            key={product.pno}
            onClick={() => moveToRead(product.pno)}
          >
            <div className='flex h-full flex-col'>
              <div className='w-full p-2 text-2xl font-extrabold'>
                {product.pno}
              </div>
              <div className='m-1 flex w-full flex-col p-2 text-xl'>
                <div className='w-full overflow-hidden'>
                  <img
                    className='m-auto w-60 rounded-md'
                    src={`/api/products/view/s_${product.uploadFileNames[0]}`}
                    alt='product'
                  />
                </div>
                <div className='bottom-0 bg-white font-extrabold'>
                  <div className='p-1 text-center'>이름 : {product.pname}</div>
                  <div className='p-1 text-center'>가격 : {product.price}</div>
                </div>
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

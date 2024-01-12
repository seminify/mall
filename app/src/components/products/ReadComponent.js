import { useQuery } from '@tanstack/react-query';
import { getOne } from 'api/productsApi';
import FetchingModal from 'components/common/FetchingModal';
import useCustomCart from 'hooks/useCustomCart';
import useCustomLogin from 'hooks/useCustomLogin';
import useCustomMove from 'hooks/useCustomMove';

const initialState = {
  pno: 0,
  pname: '',
  price: 0,
  pdesc: '',
  uploadFileNames: [],
};

const ReadComponent = ({ pno }) => {
  const { moveToList, moveToModify } = useCustomMove();
  const { loginState } = useCustomLogin();
  const { cartItems, changeCart } = useCustomCart();
  const { isFetching, data } = useQuery({
    queryKey: ['products', pno],
    queryFn: () => getOne(pno),
    staleTime: 1000 * 10,
  });
  const product = data || initialState;
  const onClick = () => {
    let qty = 1;
    const addedItem = cartItems.filter((item) => item.pno === parseInt(pno))[0];
    if (addedItem) {
      if (
        window.confirm('이미 추가된 상품입니다. 추가하시겠습니까? ') === false
      )
        return;
      qty = addedItem.qty + 1;
    }
    changeCart({
      email: loginState.email,
      pno,
      qty,
    });
  };
  if (isFetching) return <FetchingModal />;
  return (
    <div className='m-2 mt-10 border-2 border-sky-200 p-4'>
      <div className='mt-10 flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>PNO</div>
          <div className='w-4/5 rounded-r border border-solid p-6 shadow-md'>
            {product.pno}
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>PNAME</div>
          <div className='w-4/5 rounded-r border border-solid p-6 shadow-md'>
            {product.pname}
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>PRICE</div>
          <div className='w-4/5 rounded-r border border-solid p-6 shadow-md'>
            {product.price}
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
          <div className='w-1/5 p-6 text-right font-bold'>PDESC</div>
          <div className='w-4/5 rounded-r border border-solid p-6 shadow-md'>
            {product.pdesc}
          </div>
        </div>
      </div>
      <div className='m-auto flex w-full flex-col items-center justify-center'>
        {product.uploadFileNames.map((uploadFileName, i) => (
          <img
            className='w-1/2 p-4'
            key={i}
            src={`/api/products/view/${uploadFileName}`}
            alt='product'
          />
        ))}
      </div>
      <div className='flex justify-end p-4'>
        <button
          className='m-2 inline-block w-32 rounded bg-green-500 p-4 text-xl text-white'
          type='button'
          onClick={onClick}
        >
          Add Cart
        </button>
        <button
          className='m-2 inline-block w-32 rounded bg-red-500 p-4 text-xl text-white'
          type='button'
          onClick={() => moveToModify(pno)}
        >
          Modify
        </button>
        <button
          className='m-2 w-32 rounded bg-blue-500 p-4 text-xl text-white'
          type='button'
          onClick={() => moveToList()}
        >
          List
        </button>
      </div>
    </div>
  );
};

export default ReadComponent;

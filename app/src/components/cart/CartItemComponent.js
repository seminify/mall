const CartItemComponent = ({
  cino,
  pname,
  price,
  pno,
  qty,
  imageFile,
  email,
  changeCart,
}) => {
  const onClick = (amount) => {
    changeCart({
      email,
      cino,
      pno,
      qty: qty + amount,
    });
  };
  return (
    <li
      className='border-2'
      key={cino}
    >
      <div className='w-full border-2'>
        <div className='m-1 p-1'>
          <img
            src={`/api/products/view/s_${imageFile}`}
            alt='product'
          />
        </div>
        <div className='justify-center p-2 text-xl'>
          <div className='w-full justify-end'></div>
          <div>Cart Item No : {cino}</div>
          <div>Pno : {pno}</div>
          <div>Name : {pname}</div>
          <div>Price : {price}</div>
          <div className='flex'>
            <div className='w-2/3'>Qty : {qty}</div>
            <div>
              <button
                className='m-1 w-8 rounded-lg bg-orange-500 p-1 text-2xl'
                onClick={() => onClick(1)}
              >
                +
              </button>
              <button
                className='m-1 w-8 rounded-lg bg-orange-500 p-1 text-2xl'
                onClick={() => onClick(-1)}
              >
                -
              </button>
            </div>
          </div>
          <div>
            <div className='flex justify-center p-2 font-bold text-white'>
              <button
                className='m-1 w-8 rounded-lg bg-red-500 p-1 text-xl text-white'
                onClick={() => onClick(-1 * qty)}
              >
                X
              </button>
            </div>
            <div className='m-2 border-t-2 pr-4 text-right font-extrabold'>
              {qty * price} 원
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItemComponent;

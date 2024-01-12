import useCustomCart from 'hooks/useCustomCart';
import useCustomLogin from 'hooks/useCustomLogin';
import { useEffect } from 'react';

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();
  const { cartItems, refreshCart, changeCart } = useCustomCart();
  const total = () => {
    let total = 0;
    for (const item of cartItems) total += item.price * item.qty;
    return total;
  };
  useEffect(() => {
    if (isLogin) refreshCart();
  }, [isLogin]);
  return (
    <div className='w-full'>
      {isLogin ? (
        <div className='flex flex-col'>
          <div className='flex w-full'>
            <div className='w-4/5 text-2xl font-extrabold'>
              {loginState.nickname}'s Cart
            </div>
            <div className='m-1 w-1/5 rounded-full bg-orange-600 text-center font-bold text-white'>
              {cartItems.length}
            </div>
          </div>
          <div>
            <ul>
              {cartItems.map((item) => (
                <CartComponent
                  {...item}
                  email={loginState.email}
                  changeCart={changeCart}
                  key={isLogin.cino}
                />
              ))}
            </ul>
          </div>
          <div>
            <div className='text-right text-2xl font-extrabold'>
              TOTAL : {total}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartComponent;

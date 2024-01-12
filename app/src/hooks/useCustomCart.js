import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCartItems, postChangeCart } from 'api/cartApi';
import { cartState } from 'atoms/cartState';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const useCustomCart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const queryClient = useQueryClient();
  const changeMutation = useMutation({
    mutationFn: (param) => postChangeCart(param),
    onSuccess: (result) => setCartItems(result),
  });
  const { isSuccess, data } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems,
    staleTime: 1000 * 60 * 60,
  });
  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries('cart');
      setCartItems(data);
    }
  }, [isSuccess]);
  const changeCart = (param) => {
    changeMutation.mutate(param);
  };
  return { cartItems, changeCart };
};

export default useCustomCart;

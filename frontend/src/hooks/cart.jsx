import { useRecoilState } from 'recoil';
import { cartState } from '../recoil/atoms/cart';
import { useEffect } from 'react';
import { saveState } from '../utils/localStorage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  useEffect(() => {
    saveState('cartItems', cart);
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const isItemExist = prevCart.find((i) => i._id === item._id);
      if (isItemExist) {
        toast.info('Item already in cart!');
        return prevCart.map((i) => (i._id === isItemExist._id ? item : i));
      } else {
        toast.success('Item added to cart successfully!');
        return [...prevCart, item];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((i) => i._id !== itemId);
      if (newCart.length === prevCart.length) {
        toast.error('Item not found in cart!');
      } else {
        toast.info('Item removed from the cart!');
      }
      return newCart;
    });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
  };
};

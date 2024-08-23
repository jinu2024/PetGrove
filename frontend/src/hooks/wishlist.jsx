// hooks/useWishlist.js
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { wishlistState } from '../recoil/atoms/wishlist';
import { toast } from 'react-toastify';
import { loadState, saveState } from '../utils/localStorage'; // Ensure these functions are implemented

const useWishlist = () => {
  const [wishlist, setWishlist] = useRecoilState(wishlistState);

  // Load wishlist state from local storage on component mount
  useEffect(() => {
    const savedWishlist = loadState('wishlistItems');
    if (savedWishlist) {
      setWishlist(savedWishlist);
    }
  }, [setWishlist]);

  // Save wishlist state to local storage whenever it changes
  useEffect(() => {
    saveState('wishlistItems', wishlist);
  }, [wishlist]);

  // Function to add an item to the wishlist
  const addToWishlist = (item) => {
    const isItemExist = wishlist.find((i) => i._id === item._id);
    if (isItemExist) {
      toast.info('Item already exists in your wishlist');
    } else {
      setWishlist((prevWishlist) => [...prevWishlist, item]);
      toast.success('Item added to your wishlist');
    }
  };

  // Function to remove an item from the wishlist
  const removeFromWishlist = (itemId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item._id !== itemId)
    );
    toast.info('Removed from wishlist');
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  };
};

export default useWishlist;

// recoil/atoms/wishlist.js
import { atom } from 'recoil';
import { loadState } from '../../utils/localStorage';

export const wishlistState = atom({
  key: 'wishlistState',
  default: loadState('wishlistItems') || [],
});

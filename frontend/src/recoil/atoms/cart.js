import { atom } from 'recoil';
import { loadState } from '../../utils/localStorage';

export const cartState = atom({
  key: 'cartState',
  default: loadState('cartItems') || [],
});

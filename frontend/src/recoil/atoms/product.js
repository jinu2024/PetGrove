// Import atom instead of atomFamily
import { atom } from 'recoil';

// Define productState as a regular atom
export const productState = atom({
  key: 'productState',
  default: [],
});

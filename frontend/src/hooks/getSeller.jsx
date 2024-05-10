import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { sellerState } from '../recoil/atoms/seller';
import { server } from '../server';

const useSellerAuth = () => {
  const [seller, setSeller] = useRecoilState(sellerState);

  useEffect(() => {
    if (!seller.isAuthenticated) {
      axios.get(`${server}/shop/getseller`, { withCredentials: true })
        .then((res) => {
          toast.success(res.data.message);
          setSeller({
            isAuthenticated: true,
            avatar: res.data.seller.avatar,
            name: res.data.seller.name,
            email: res.data.seller.email,
            _id: res.data.seller._id,
          });
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || 'An error occurred.');
        });
    }
  }, [seller.isAuthenticated, setSeller]);

  return seller;
};

export default useSellerAuth;

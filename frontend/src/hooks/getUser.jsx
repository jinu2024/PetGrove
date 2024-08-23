import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/atoms/user';
import { server } from '../server';

const useUserAuth = () => {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.isAuthenticated) {
      axios.get(`${server}/user/getUser`, { withCredentials: true })
        .then((res) => {
          toast.success(res.data.message);
          setUser({
            isAuthenticated: true,
            avatar: res.data.user.avatar,
            name: res.data.user.name,
            email: res.data.user.email,
            _id: res.data.user._id,
            phoneNumber: res.data.user.phoneNumber,
            addresses: res.data.user.addresses,
          });
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || 'An error occurred.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user.isAuthenticated, setUser]);

  return { user, loading };
};

export default useUserAuth;

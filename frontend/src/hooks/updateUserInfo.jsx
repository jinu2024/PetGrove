import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/atoms/user';
import { server } from '../server';

const useUpdateUserInfo = () => {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);

  const updateUserInfoHandler = async (userInfo) => {
    setLoading(true);
    try {
      const response = await axios.put(`${server}/user/update-user-info`, userInfo, { withCredentials: true });
      const updatedUser = response.data.user;

      setUser((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
      }));

      toast.success('User info updated successfully!');
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.message || 'An error occurred.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    updateUserInfoHandler,
    loading,
  };
};

export default useUpdateUserInfo;

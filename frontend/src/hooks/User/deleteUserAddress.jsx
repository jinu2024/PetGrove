import { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms/user';
import { server } from '../../server';
import { toast } from 'react-toastify';

const useDeleteUserAddress = () => {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);

  const deleteUserAddress = async (addressId) => {
    setLoading(true);
    try {
      const userId = user._id; // Assuming user is already authenticated and available in state
      const response = await axios.delete(`${server}/user/delete-user-address/${addressId}`, { withCredentials: true });
      if (response.data.success) {
        // Update user state after successful deletion
        setUser(prevUser => ({
          ...prevUser,
          addresses: prevUser.addresses.filter(address => address._id !== addressId)
        }));
        toast.success('Address deleted successfully')
      }
    } catch (error) {
      toast.error('Failed to delete user address:', error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteUserAddress, loading };
};

export default useDeleteUserAddress;

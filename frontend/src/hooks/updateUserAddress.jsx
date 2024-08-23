import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/atoms/user';
import { server } from '../server';


const useUpdateAddress = () => {
    const [user, setUser] = useRecoilState(userState);
    const [loading, setLoading] = useState(false);

    const handleUpdateAddress = async (addressData) => {
        setLoading(true);
        try {
            const response = await axios.put(`${server}/user/update-user-addresses`, addressData, {
                withCredentials: true,
            });
            if (response.data.success) {
                setUser((prevUser) => ({
                    ...prevUser,
                    addresses: response.data.user.addresses,
                }));
                toast.success('Address updated successfully');
            } else {
                toast.error('Failed to update address');
            }
        } catch (error) {
            toast.error('Failed to update address: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, handleUpdateAddress };
};

export default useUpdateAddress;

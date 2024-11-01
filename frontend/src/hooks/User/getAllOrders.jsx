import { useRecoilState, useRecoilValue } from "recoil"
import { UserOrderState } from "../../recoil/atoms/userorder"
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { userState } from "../../recoil/atoms/user";



const useGetAllOrders = () =>{

    const [allOrders, setAllOrders] = useRecoilState(UserOrderState);
    const [loading, setLoading] = useState(false);
    const user = useRecoilValue(userState);

    useEffect(()=>{
        if(allOrders.length === 0){
            setLoading(true);
            axios.get(`${server}/order/get-all-orders/${user._id}`, { withCredentials: true })
            .then((response)=>{
                setLoading(false);
                setAllOrders(response.data.orders);
            })
        }
    }, [allOrders.length,  user, setAllOrders])

    return {allOrders, loading, setAllOrders}
}

export default useGetAllOrders;
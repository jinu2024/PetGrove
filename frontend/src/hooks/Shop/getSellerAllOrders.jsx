import { useRecoilState, useRecoilValue } from "recoil";
import { sellerOrderState } from "../../recoil/atoms/sellerorder";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { userState } from "../../recoil/atoms/user";
import { sellerState } from "../../recoil/atoms/seller";

const useGetSellerAllOrders = () => {
    const [sellerOrders, setSellerOrders] = useRecoilState(sellerOrderState);
    const [loading, setLoading] = useState(false);
    const {_id} = useRecoilValue(sellerState);

    useEffect(() => {
        if (sellerOrders.length === 0) {
            setLoading(true);
            axios.get(`${server}/order/get-seller-all-orders/${_id}`, { withCredentials: true })
                .then((response) => {
                    setLoading(false);
                    setSellerOrders(response.data.orders);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Failed to fetch seller orders:", error);
                });
        }
    }, [sellerOrders.length, setSellerOrders]);

    return { sellerOrders, loading };
}

export default useGetSellerAllOrders;

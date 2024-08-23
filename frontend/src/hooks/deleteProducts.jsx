import { useRecoilState } from "recoil";
import { productState } from "../recoil/atoms/product";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import { useState } from "react";

const useDeleteProduct = () => {
    const [products, setProducts] = useRecoilState(productState);
    const [loading, setLoading] = useState(false);

    const deleteProduct = async (productId) => {
        setLoading(true);
        try {
            const response = await axios.delete(`${server}/product/delete-shop-product/${productId}`, {
                withCredentials: true});
            if (response.data.success) {
                toast.success('Product deleted successfully');

                // Remove the deleted product from the state
                setProducts(products.filter(product => product._id !== productId));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { deleteProduct, loading };
};

export default useDeleteProduct;

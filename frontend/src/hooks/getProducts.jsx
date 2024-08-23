import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { server } from '../server';
import { productState } from '../recoil/atoms/product';

const useGetProducts = (id) => {
  const [products, setProducts] = useRecoilState(productState); // Initialize productState Recoil state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id || products.length > 0) return; // Fetch products only if id is available and products state is empty
    setLoading(true);
    axios.get(`${server}/product/get-all-products-shop/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        toast.error('Failed to fetch products');
        setLoading(false);
      });
  }, [id, products, setProducts]);

  return { products, loading };
};

export default useGetProducts;

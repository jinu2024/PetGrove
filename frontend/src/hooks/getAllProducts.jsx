import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { allProductsState } from '../recoil/atoms/allProducts';
import { server } from '../server';

const useGetAllProducts = () => {
  const [products, setProducts] = useRecoilState(allProductsState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products.length === 0) { 
      setLoading(true);
      axios.get(`${server}/product/get-all-products`)
        .then((response) => {
          setLoading(false);
          setProducts(response.data.products);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [setProducts]); // Include setProducts in dependency array to prevent stale closures

  return { products, loading };
};

export default useGetAllProducts;

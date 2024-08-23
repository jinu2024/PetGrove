import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/styles';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/Home/ProductCard/ProductCard';
import { allProductsState } from '../recoil/atoms/allProducts';
import { useRecoilValue } from 'recoil';
import useGetProducts from '../hooks/getProducts';
import Loader from '../components/Layout/Loader';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const allProducts = useRecoilValue(allProductsState);
  const {loading} = useGetProducts();

  useEffect(() => {
    if (categoryData === null) {
      const sortedData = allProducts.slice().sort((a, b) => a.sold_out - b.sold_out);
      setData(sortedData);
    } else {
      const filteredData = allProducts.filter((i) => i.category === categoryData);
      setData(filteredData);
    }
  }, [categoryData, allProducts]);
  

  return (
    <>
    {
      loading ? (
        <Loader />
      ) : (
        <div>
        <Header activeHeading={3} />
        <br />
        <br />
        <div className={`${styles.section}`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
          {data && data.length === 0 ? (
            <h1 className="text-center w-full pb-[100px] text-[20px]">
              No products Found!
            </h1>
          ) : null}
        </div>
        <Footer />
      </div>
      )
    }
    </>
  );
}

export default ProductsPage;

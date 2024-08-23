import React, { useEffect, useState } from 'react';
import ProductCard from '../Home/ProductCard/ProductCard';
import styles from '../../styles/styles';
import useGetAllProducts from '../../hooks/getAllProducts';
import { useRecoilValue } from 'recoil';
import { allProductsState } from '../../recoil/atoms/allProducts';

const SuggestedProduct = ({ data }) => {
    const products = useRecoilValue(allProductsState);
    const [suggestedProducts, setSuggestedProducts] = useState([]);

    useEffect(() => {
        if (data && Array.isArray(products)) {
            const filteredProducts = products.filter((product) =>
                product.category === data.category && product._id !== data._id
            );
            setSuggestedProducts(filteredProducts);
        }
    }, [data, products]);



    return (
        <div>
            {data && (
                <div className={`p-4 ${styles.section}`}>
                    <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}>
                        Related Products
                    </h2>
                    <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
                        {suggestedProducts.map((product, index) => (
                            <ProductCard data={product} key={index} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuggestedProduct;

import React from 'react';
import styles from '../../../styles/styles';
import ProductCard from '../ProductCard/ProductCard';
import { allProductsState } from '../../../recoil/atoms/allProducts';
import { useRecoilState } from 'recoil';

const Featureproduct = () => {
    const [products, setProducts] = useRecoilState(allProductsState)

    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1>Featured Products</h1>
                </div>
                <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 b-0'>
                    {
                        products.map((product, index) => (
                            <ProductCard data={product} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Featureproduct;

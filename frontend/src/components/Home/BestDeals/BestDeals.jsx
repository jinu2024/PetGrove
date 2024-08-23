import React, { useEffect, useState } from 'react';
import styles from '../../../styles/styles';
import ProductCard from '../ProductCard/ProductCard';
import useGetAllProducts from '../../../hooks/getAllProducts';

const BestDeals = () => {
    const { products, loading } = useGetAllProducts(); // Use the hook
    const [data, setData] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const sortedProducts = [...products].sort((a, b) => b.sold_out - a.sold_out); // Create a copy of products array before sorting
            const firstFive = sortedProducts.slice(0, 5);
            setData(firstFive);
        }
    }, [products]);

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator
    }

    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1>Best Deals</h1>
                </div>
                <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 b-0'>
                    {
                        data.map((product, index) => (
                            <ProductCard data={product} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default BestDeals;

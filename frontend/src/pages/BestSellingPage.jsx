import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import { useSearchParams } from 'react-router-dom'
import { productData } from '../static/data'
import ProductCard from '../components/Home/ProductCard/ProductCard'
import { useRecoilValue } from 'recoil'
import { allProductsState } from '../recoil/atoms/allProducts'
const BestSellingPage = () => {

    const [data, setData] = useState([]);
    const allProducts = useRecoilValue(allProductsState);

    useEffect(()=>{
        const d = allProducts && allProducts.slice().sort((a,b)=> b.sold_out- a.sold_out);
        setData(d);
    }, []);
  return (
    <div>
        <Header activeHeading={2}/>
        <br />
        <br />
        <div className={`${styles.section}`}>
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
                {
                    data && data.map((i, index)=> <ProductCard data={i} key={index}/>)
                }
                
            </div>
        </div>
    </div>
  )
}

export default BestSellingPage
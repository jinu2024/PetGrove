import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../../styles/styles';
import useGetProducts from '../../hooks/getProducts';
import ProductCard from '../Home/ProductCard/ProductCard';

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  const { id } = useParams();
  const { products, loading } = useGetProducts(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full'>
      <div className="flex w-full items-center">
        <div className='w-full flex'>
          <div className="flex item-center" onClick={() => setActive(1)}>
            <h5 className={`font-[600] text-[20px] ${active === 1 ? "text-red-500" : "text-[#333]"} cursor-pointer pr-[20px]`}>
              Shop Products
            </h5>
          </div>
          <div className="flex item-center" onClick={() => setActive(2)}>
            <h5 className={`font-[600] text-[20px] ${active === 2 ? "text-red-500" : "text-[#333]"} cursor-pointer pr-[20px]`}>
              Running Events
            </h5>
          </div>
          <div className="flex item-center" onClick={() => setActive(3)}>
            <h5 className={`font-[600] text-[20px] ${active === 3 ? "text-red-500" : "text-[#333]"} cursor-pointer pr-[20px]`}>
              Shop Preview
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to='/dashboard'>
                <div className={`${styles.button} !rounded h-[42px]`}>
                  <span className='text-[#fff]'> Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <br />

      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
        {products && products.map((product, index) => (
          <ProductCard data={product} key={index} isShop={true} />
        ))}
      </div>
    </div>
  );
};

export default ShopProfileData;

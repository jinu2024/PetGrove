import React, { useEffect } from 'react';
import ShopRegistration from '../components/Shop/ShopRegistration'
import { useNavigate } from 'react-router-dom';
import { sellerState } from '../recoil/atoms/seller';
import { useRecoilValue } from 'recoil';

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const seller = useRecoilValue(sellerState);
  const isAuthenticated = seller.isAuthenticated;
  useEffect(()=>{
    if(isAuthenticated){
      navigate(`/dashboard`)
    }
  }, [isAuthenticated])
  return (
    <div>
        <ShopRegistration/>
        </div>
  )
}

export default ShopCreatePage
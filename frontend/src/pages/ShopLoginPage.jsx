import React, { useEffect } from 'react';
import ShopLogin from '../components/Shop/ShopLogin.jsx';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { sellerState } from '../recoil/atoms/seller.js';

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const seller = useRecoilValue(sellerState);
  const isAuthenticated = seller.isAuthenticated;
  useEffect(()=>{
    if(isAuthenticated){
      navigate(`/shop/${seller._id}`)
    }
  }, [isAuthenticated])
  return (
    <div><ShopLogin/></div>
  )
}

export default ShopLoginPage
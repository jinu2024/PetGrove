import React, { useEffect } from 'react';
import ShopLogin from '../components/Shop/ShopLogin.jsx';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { sellerState } from '../recoil/atoms/seller.js';
import { loadingState } from '../recoil/atoms/user.js';

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const seller = useRecoilValue(sellerState);
  const loading = useRecoilValue(loadingState);
  const isAuthenticated = seller.isAuthenticated;
  useEffect(()=>{
    if(isAuthenticated){
      navigate(`/dashboard`)
    }
  }, [isAuthenticated, loading])
  return (
    <div><ShopLogin/></div>
  )
}

export default ShopLoginPage
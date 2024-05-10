import React, { useEffect } from 'react'
import Login from "../components/Login"
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/atoms/user';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const isAuthenticated = user.isAuthenticated;
  useEffect(()=>{
    if(isAuthenticated){
      navigate("/")
    }
  }, [isAuthenticated])
  return (
    <div>
    <Login/>
    </div>
  )
}

export default LoginPage
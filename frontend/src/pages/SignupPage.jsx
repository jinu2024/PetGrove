import React, { useEffect } from 'react'
import Signup from "../components/Signup"
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../recoil/atoms/user';

const SignupPage = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const isAuthenticated = user.isAuthenticated;
  useEffect(()=>{
    if(isAuthenticated === true){
      navigate("/")
    }
  }, [isAuthenticated])
  return (
    <div>
        <Signup/>
    </div>
  )
}

export default SignupPage
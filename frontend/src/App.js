import React, { useEffect } from 'react'
import "./App.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {LoginPage,SignupPage, ActivationPage, ProductsPage, HomePage, BestSellingPage, EventsPage, FAQPage} from "./Routes.js"; 
import axios from 'axios';
import { server } from './server.js';
import { loadingState, userState } from './recoil/atoms/user';
import { useRecoilState, useRecoilValue } from 'recoil';


const App = () => {
  const [user, setUser] = useRecoilState(userState);
  const loading = useRecoilValue(loadingState);
  useEffect(() => {
    axios.get(`${server}/user/getuser`, { withCredentials: true })
        .then((res) => {
            toast.success(res.data.message);
            setUser({
                ...user,
                isAuthenticated: true,
                avatar: res.data.user.avatar,
            });
        })
        .catch((err) => {
            toast.error(err.response.data.message);
        });
}, [setUser]);
  return (
    <>
    {
      loading ? (
        null
      ):(
        <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path= "/login" element = {<LoginPage/>}/>
      <Route path= "/signup" element = {<SignupPage/>}/>
      <Route path = "/activation/:activation_token" element={<ActivationPage/>}/>
      <Route path='/products' element={<ProductsPage/>}/>
      <Route path='/best-selling' element={<BestSellingPage/>}/>
      <Route path='/events' element={<EventsPage/>}/>
      <Route path='/faq' element={<FAQPage/>}/>
    </Routes>
    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
      )
    }
    </>
  )
}

export default App
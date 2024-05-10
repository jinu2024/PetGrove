import React from 'react'
import "./App.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {LoginPage,
  SignupPage,
  ActivationPage,
  ProductsPage,
  HomePage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  CheckOutPage,
  OrderSuccessPage,
  PaymentPage,
  SellerActivationPage,
  ShopLoginPage} from "./Routes.js"; 

import { loadingState } from './recoil/atoms/user';
import {useRecoilValue } from 'recoil';
import useUserAuth from './hooks/getUser.jsx';
import useSellerAuth from './hooks/getSeller.jsx';
import ProtectedRoute from './ProtectedRoute';
import {ShopHomePage} from './ShopRoutes.js'
import SellerProtectedRoute from './SellerProtectedRoute';


const App = () => {
  const loading = useRecoilValue(loadingState);

  const userAuth = useUserAuth();
  const sellerAuth = useSellerAuth();

  return (
    <>
    {
      loading ? (
        <div>Loading...</div>
      ):(
        <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path= "/login" element = {<LoginPage/>}/>
      <Route path= "/signup" element = {<SignupPage/>}/>
      <Route path = "/activation/:activation_token" element={<ActivationPage/>}/>
      <Route path = "/seller/activation/:activation_token" element={<SellerActivationPage/>}/>
      <Route path='/products' element={<ProductsPage/>}/>
      <Route path='/product/:name' element={<ProductDetailsPage/>}/>
      <Route path='/best-selling' element={<BestSellingPage/>}/>
      <Route path='/events' element={<EventsPage/>}/>
      <Route path='/faq' element={<FAQPage/>}/>
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/checkout" element={<CheckOutPage/> } />
      <Route path='/payment' element={<PaymentPage/>}/>
      <Route path='/order/success/:id' element={<OrderSuccessPage/>}/>
      {/* Shop Routes */}
      <Route path='/shop-create' element={<ShopCreatePage/>}/>
      <Route path='/shop-login' element={<ShopLoginPage/>}/>
      <Route path='/shop/:id' element={<SellerProtectedRoute><ShopHomePage /></SellerProtectedRoute>}/>

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
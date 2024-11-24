import React from 'react'
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'
import UserOrderDetails from '../components/UserOrderDetails.jsx'


const OrderDetailsPage = () => {
  return (
    <div>
        <Header/>
        <UserOrderDetails/>
        <Footer/>
    </div>
  )
}

export default OrderDetailsPage
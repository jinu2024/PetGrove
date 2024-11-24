import React from 'react'
import { useRecoilValue } from 'recoil'
import { sellerState } from '../../../recoil/atoms/seller'
import { Link } from 'react-router-dom';
import logo from '../../../Assets/isolated-monochrome-black.svg'
import { AiOutlineGift } from 'react-icons/ai';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { backend_url } from '../../../server';

const DashboardHeader = () => {
    const {avatar, _id} = useRecoilValue(sellerState);
  return (
    <div className='w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4'>
        <div>
            <Link to="/">
                <img src={logo} alt="" className="h-[30px]" />
            </Link>
        </div>
        <div className="flex items">
            <div className="flex items-center mr-4">
              <Link to="/dashboard/coupons" className='800px:block hidden'>
                <AiOutlineGift color='#555' size={30} className='mx-5 cursor-pointer'/>
              </Link>
              <Link to="/dashboard-events" className='800px:block hidden'>
                <MdOutlineLocalOffer color='#555' size={30} className='mx-5 cursor-pointer'/>
              </Link>
              <Link to="/dashboard-products" className='800px:block hidden'>
                <FiShoppingBag color='#555' size={30} className='mx-5 cursor-pointer'/>
              </Link>
              <Link to="/dashboard-orders" className='800px:block hidden'>
                <FiPackage color='#555' size={30} className='mx-5 cursor-pointer'/>
              </Link>
              <Link to="/dashboard-messages" className='800px:block hidden'>
                <BiMessageSquareDetail color='#555' size={30} className='mx-5 cursor-pointer'/>
              </Link>
              <Link to={`/shop/${_id}`}>
                <img src={`${backend_url}${avatar}`} alt="" 
                className='w-[50px] h-[50px] rounded-full object-cover'/>
              </Link>
            </div>
        </div>
        
    </div>
  )
}

export default DashboardHeader
import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { IoBagHandleOutline } from 'react-icons/io5';
import { HiOutlineMinus, HiPlus } from 'react-icons/hi';
import styles from '../styles/styles';
import { Link } from 'react-router-dom';

const Cart = ({ setOpenCart }) => {
    const cartData = [
        {
            name: "Pedigree Puppy Food | Dry & Wet Starter - Dog Puppies",
            description: "test",
            price: 40,
        },
        {
            name: "Whiskas Chicken Gravy Adult Cat Wet Food",
            description: "test",
            price: 40,
        },
        {
            name: "WAUDOG Waterproof Leash for Dogs - Strong and Durable Dog Leash - Walking & Running Leash for Pet Dogs - Orange",
            description: "test",
            price: 12,
        },
    ]
    return (
        <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
            <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-normal shadow-sm">
                <div>
                    <div className="flex w-full justify-end pt-5 pr-5">
                        <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpenCart(false)} />
                    </div>
                    {/* Items Length */}
                    <div className={`${styles.normalFlex} p-4`}>
                        <IoBagHandleOutline size={25} />
                        <h5 className='pl-2 text-[20px] font-[500]'>
                            3 items
                        </h5>
                    </div>

                    {/* Cart Items */}
                    <br />
                    <div className='w-full border-t'>
                        {
                            cartData && cartData.map((i, index) => (
                                <CartSingle key={index} data={i} />
                            ))
                        }

                    </div>
                </div>
                <div className="px-5 mb-3">
                    {/* CheckOut Button */}
                    <Link to="/checkout">
                        <div className="h-[45px] flex items-center justify-center w-[100%] bg-[#63239c] rounded-[5px] mt-12">
                            <h1 className='text-[#fff] text-[18px] font-[600]'>CheckOut Now(USD$1080)</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const CartSingle = ({ data }) => {
    const [value, setValue] = useState(1);
    const totalPrice = data.price * value;

    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
                <div>
                    <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`} onClick={() => setValue(value + 1)}>
                        <HiPlus size={18} color="#fff" />
                    </div>
                    <span className='pl-[10px]'>
                        {value}
                    </span>
                    <div className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer" onClick={() => setValue(value === 1 ? 1 : value - 1)}>
                        <HiOutlineMinus size={16} color="#7d879c" />
                    </div>
                </div>
                <img src="https://www.bigbasket.com/media/uploads/p/xxl/40235058_1-whiskas-wet-cat-food-adult-1-year-tuna-in-jelly-for-balanced-nutrition-shiny-coat.jpg" alt="" className='w-[80px] h-[80px] ml-2' />
                <div className="pl-[5px]">
                    <h1>{data.name}</h1>
                    <h4 className='font-[400] text-[15px] text-[#00000082]'>${data.price} * {value}</h4>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>US${totalPrice}</h4>
                </div>
                <div>
                <RxCross1 size={10} className='cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default Cart
import React, { useState, useEffect } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { IoBagHandleOutline } from 'react-icons/io5';
import { HiOutlineMinus, HiPlus } from 'react-icons/hi';
import styles from '../styles/styles';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartState } from '../recoil/atoms/cart';
import { backend_url } from '../server';
import { useCart } from '../hooks/cart';

const Cart = ({ setOpenCart }) => {
    const cart = useRecoilValue(cartState);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);
        setTotalPrice(total);
    }, [cart]);

    return (
        <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
            <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
                {cart && cart.length === 0 ? (
                    <div className="w-full h-screen flex items-center justify-center">
                        <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                            <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpenCart(false)} />
                        </div>
                        <h5>Your cart is empty</h5>
                    </div>
                ) : (
                    <>
                        <div>
                            <div className="flex w-full justify-end pt-5 pr-5">
                                <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpenCart(false)} />
                            </div>
                            {/* Items Length */}
                            <div className={`${styles.normalFlex} p-4`}>
                                <IoBagHandleOutline size={25} />
                                <h5 className='pl-2 text-[20px] font-[500]'>
                                    {cart && cart.length} items
                                </h5>
                            </div>

                            {/* Cart Items */}
                            <br />
                            <div className='w-full border-t'>
                                {cart && cart.map((i, index) => (
                                    <CartSingle key={index} data={i} index={index} />
                                ))}
                            </div>
                        </div>
                        <div className="px-5 mb-3">
                            {/* CheckOut Button */}
                            <Link to="/checkout">
                                <div className="h-[45px] flex items-center justify-center w-[100%] bg-[#63239c] rounded-[5px]">
                                    <h1 className='text-[#fff] text-[18px] font-[600]'>
                                        CheckOut Now (USD${totalPrice})
                                    </h1>
                                </div>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const CartSingle = ({ data, index }) => {
    const setCart = useSetRecoilState(cartState);
    const [value, setValue] = useState(data.quantity);
    const totalPrice = data.discountPrice * value;
    const { removeFromCart } = useCart();

    const updateQuantity = (newQuantity) => {
        setCart(cart => cart.map((item, i) =>
            i === index ? { ...item, quantity: newQuantity } : item
        ));
    };

    const increment = () => {
        const newValue = value + 1;
        setValue(newValue);
        updateQuantity(newValue);
    };

    const decrement = () => {
        const newValue = value === 1 ? 1 : value - 1;
        setValue(newValue);
        updateQuantity(newValue);
    };

    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
                <div>
                    <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`} onClick={increment}>
                        <HiPlus size={18} color="#fff" />
                    </div>
                    <span className='pl-[10px]'>{value}</span>
                    <div className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer" onClick={decrement}>
                        <HiOutlineMinus size={16} color="#7d879c" />
                    </div>
                </div>
                <img src={`${backend_url}/${data?.images[0]}`} alt="" className='w-[130px] h-min ml-2 mr-2 rounded-[5px]' />
                <div className="pl-[5px]">
                    <h1>{data.name}</h1>
                    <h4 className='font-[400] text-[15px] text-[#00000082]'>${data.discountPrice} * {value}</h4>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>US${totalPrice}</h4>
                </div>
                <div>
                    <RxCross1 size={10} className='cursor-pointer' onClick={() => removeFromCart(data._id)} />
                </div>
            </div>
        </div>
    );
};

export default Cart;

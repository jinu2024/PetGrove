import React from 'react';
import styles from '../../../styles/styles';
import CountDown from './CountDown';
const EventCard = ({active}) => {
  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset": "mb-12"} lg:flex p-2 mb-12`}>
        <div className='w-full lg:[50%] m-auto'>
            <img src="https://media.istockphoto.com/id/1223511966/photo/beautiful-tan-and-black-german-pinscher.jpg?b=1&s=612x612&w=0&k=20&c=qPE1lwXCwkZcU4P2CUKufJSM_ARSCnUAeICgd_s_zqU=" alt="" className='m-10 rounded-md' />
        </div>
        <div className="w-full lg:[w-50%] flex flex-col justify-center ">
            <h2 className={`${styles.productTitle}`}>Doberman Pincher</h2>
            <p>Introducing our captivating Doberman collection. Immerse yourself in the grace and power of this iconic breed. Each piece exudes sophistication and quality, capturing the essence of the Doberman's noble lineage. Elevate your surroundings with our carefully curated selection, designed to honor the strength and elegance of these remarkable companions.</p>
            <div className="flex py-2 justify-between">
                <div className="flex">
                    <h5 className='font-[500] text-[18px] text-[#d55b45] pr-3 line-through '>
                        1099$
                    </h5>
                    <h5 className='font-bold text-[20px] text-[#333] font-Roboto'>
                        999$
                    </h5>
                </div>
                <span className='pr-3 font-[400] text-[17px] text-[#44a55e]'>
                    30 sold
                </span>
            </div>
            <CountDown/>
        </div>
    </div>
  )
}

export default EventCard
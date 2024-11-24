import React from "react";
import styles from "../../../styles/styles";
import CountDown from "./CountDown";
import { backend_url } from "../../../server";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../../hooks/cart";
import { AiOutlineShoppingCart } from "react-icons/ai";

const EventCard = ({ active, data }) => {
  const { addToCart } = useCart();

  const addToCartHandler = () => {
    if (data.stock < 1) {
      toast.error("Product stock is limited!");
    } else {
      const productWithQuantity = { ...data, quantity: 1 };
      addToCart(productWithQuantity);
    }
  };
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-[70%] lg:w-[25%] m-auto">
        <img src={`${backend_url}/${data.images[0]}`} alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center 800px:px-5">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through ">
              {data.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out}
          </span>
        </div>
        <CountDown data={data} />
        <div className="flex item-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={addToCartHandler}
          >
            <span className='text-[#fff] flex items-center'>Add to cart <AiOutlineShoppingCart className='ml-1' /></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

import React from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import useWishlist from "../hooks/wishlist";
import { backend_url } from "../server";
import {useCart} from "../hooks/cart";
import styles from "../styles/styles";

const WishList = ({ setOpenWishList }) => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishList(false)}
              />
            </div>
            <h5>Your WishList is empty</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishList(false)}
                />
              </div>
              {/* Items Length */}
              <div className={`${styles.normalFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist.length} items
                </h5>
              </div>

              {/* Wishlist Items */}
              <br />
              <div className="w-full border-t">
                {wishlist.map((item, index) => (
                  <WishlistSingle
                    key={index}
                    data={item}
                    removeFromWishlist={removeFromWishlist}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const WishlistSingle = ({ data, removeFromWishlist }) => {
  const totalPrice = data.price;
  const { addToCart } = useCart();

  const handleRemove = () => {
    removeFromWishlist(data._id);
  };

  const addToCartHandler = () => {
    if (data.stock <= 0) {
      toast.error('Product stock is limited!');
    } else {
      const productWithQuantity = { ...data, quantity: 1 };
      addToCart(productWithQuantity);
    }
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <RxCross1 size={20} className="cursor-pointer" onClick={handleRemove} />
        </div>
        <img
          src={`${backend_url}/${data.images[0]}`}
          alt=""
          className="w-[130px] h-[130px] ml-2"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div className="pl-1">
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to cart"
            onClick={addToCartHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default WishList;

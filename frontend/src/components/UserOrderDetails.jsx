import React, { useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { backend_url, server } from "../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../styles/styles";
import { userState } from "../recoil/atoms/user";
import useGetAllOrders from "../hooks/User/getAllOrders";
import RefundReasonModal from "./RefundReasonModal"; // Import the modal



//Review Modal


const ReviewModal = ({ open, selectedItem, setRating, rating, comment, setComment, onClose, onSubmit }) => {
  if (!open || !selectedItem) return null;

  return (
    <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
      <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
        <div className="w-full flex justify-end p-3">
          <RxCross1 size={30} onClick={onClose} className="cursor-pointer" />
        </div>
        <h2 className="text-[30px] font-[500] font-Poppins text-center">Give a Review</h2>
        <br />
        <div className="w-full flex">
          {/* Add fallback for missing images */}
          <img
            src={`${backend_url}/${selectedItem?.images?.[0] || "default-image.jpg"}`}
            alt={selectedItem?.name || "Product Image"}
            className="w-[80px] h-[80px]"
          />
          <div>
            <div className="pl-3 text-[20px]">{selectedItem?.name || "Product"}</div>
            <h4 className="pl-3 text-[20px]">US${selectedItem?.discountPrice} x {selectedItem?.qty || 1}</h4>
          </div>
        </div>
        <br />
        <br />
        <h5 className="pl-3 text-[20px] font-[500]">Give a Rating <span className="text-red-500">*</span></h5>
        <div className="flex w-full ml-2 pt-1">
          {[1, 2, 3, 4, 5].map((i) => (
            rating >= i
              ? <AiFillStar key={i} className="mr-1 cursor-pointer" color="rgb(246,186,0)" size={25} onClick={() => setRating(i)} />
              : <AiOutlineStar key={i} className="mr-1 cursor-pointer" color="rgb(246,186,0)" size={25} onClick={() => setRating(i)} />
          ))}
        </div>
        <br />
        <div className="w-full ml-3">
          <label className="block text-[20px] font-[500]">
            Write a comment
            <span className="ml-1 font-[400] text-[16px] text-[#00000052]">(optional)</span>
          </label>
          <textarea
            cols="20"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="How was your product? Write your expression about it!"
            className="mt-2 w-[95%] border p-2 outline-none"
          ></textarea>
        </div>
        <div className={`${styles.button} text-white text-[20px] ml-3`} onClick={onSubmit}>
          Submit
        </div>
      </div>
    </div>
  );
};

const UserOrderDetails = () => {
  const { id } = useParams();
  const { allOrders, setAllOrders } = useGetAllOrders();
  const user = useRecoilValue(userState);

  const [openReview, setOpenReview] = useState(false);
  const [openRefund, setOpenRefund] = useState(false); // State for refund modal
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [reason, setReason] = useState(""); // State for refund reason

  const order = allOrders?.find((order) => order?._id === id);

  const reviewHandler = async () => {
    try {
      const response = await axios.put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `${user.token}`,
          },
        }
      );
      toast.success(response.data.message);

      setComment("");
      setRating(1);
      setOpenReview(false);

      setAllOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order._id === id) {
            const updatedCart = order.cart.map((item) =>
              item._id === selectedItem._id ? { ...item, isReviewed: true } : item
            );
            return { ...order, cart: updatedCart };
          }
          return order;
        })
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting review");
    }
  };

  const refundHandler = async () => {
    try {
      const response = await axios.put(`${server}/order/order-refund/${id}`, {
        status: "Processing refund",
        reason, // Send the refund reason to the server
      });
      toast.success(response.data.message);
      setOpenRefund(false); // Close modal after submission
    } catch (error) {
      toast.error(error.response?.data?.message || "Error processing refund");
    }
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
      </div>

      {order ? (
        <>
          <div className="w-full flex items-center justify-between pt-6">
            <h5 className="text-[#00000084]">
              Order ID: <span>#{order._id}</span>
            </h5>
            <h5 className="text-[#00000084]">
              Placed on: <span>{order.createdAt.slice(0, 10)}</span>
            </h5>
          </div>

          <br />
          <br />
          {order.cart.map((item, index) => (
            <div key={index} className="w-full flex items-start mb-5">
              <img
                src={`${backend_url}${item?.images[0]}`}
                alt=""
                className="w-[80px] h-[80px] object-cover"
              />
              <div className="w-full pl-4">
                <h5 className="text-[20px]">{item.name}</h5>
                <h5 className="text-[20px] text-[#00000091]">
                  US${item.discountPrice} x {item.quantity}
                </h5>
              </div>
              {!item.isReviewed && order.status === "Delivered" && (
                <div
                  className={`${styles.button} text-white`}
                  onClick={() => {
                    setSelectedItem(item);
                    setOpenReview(true);
                  }}
                >
                  Write a review
                </div>
              )}
            </div>
          ))}

          <div className="border-t w-full text-right">
            <h5 className="pt-3 text-[18px]">
              Total Price: <strong>US${order.totalPrice}</strong>
            </h5>
          </div>
          <br />
          <br />
          <div className="w-full flex justify-between">
            <div className="w-[60%]">
              <h4 className="pt-3 text-[20px] font-[600]">Seller Information:</h4>
              <Link to={`/shop/preview/${order?.cart[0]?.shopId}`}>
                <div className="flex items-center pt-3">
                  <img
                    src={`${backend_url}${order?.cart[0]?.shop?.avatar}`}
                    alt="Seller Avatar"
                    className="w-[50px] h-[50px] object-cover rounded-full mr-3"
                  />
                  <h4 className="text-[20px]">{order?.cart[0]?.shop?.name}</h4>
                </div>
              </Link>
              <br />
              <Link to="/">
                <div className={`${styles.button} text-white`}>Send Message</div>
              </Link>
            </div>
            <div className="w-[40%]">
              <h4 className="pt-3 text-[20px]">Payment Info:</h4>
              <h4>Status: {order?.paymentInfo?.status || "Not Paid"}</h4>
              <br />
              <div className={`${styles.button} text-white`} onClick={() => setOpenRefund(true)}>
                Get Refund
              </div>
              
            </div>
          </div>

          {/* Review and Refund Modals */}
          <ReviewModal
            open={openReview}
            selectedItem={selectedItem}
            setRating={setRating}
            rating={rating}
            comment={comment}
            setComment={setComment}
            onClose={() => setOpenReview(false)}
            onSubmit={rating > 1 ? reviewHandler : null}
          />
          <RefundReasonModal
            open={openRefund}
            onClose={() => setOpenRefund(false)}
            reason={reason}
            setReason={setReason}
            onSubmit={refundHandler}
          />
        </>
      ) : (
        <p>Order not found</p>
      )}
    </div>
  );
};

export default UserOrderDetails;

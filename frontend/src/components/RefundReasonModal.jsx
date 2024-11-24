import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../styles/styles";

// Refund Reason Modal Component
const RefundReasonModal = ({ open, onClose, onSubmit, reason, setReason }) => {
  // Initialize state
  const [selectedReason, setSelectedReason] = useState("");

  // Handle option change
  const handleOptionChange = (e) => {
    setSelectedReason(e.target.value);
    setReason(e.target.value);
  };

  // Handle custom reason change
  const handleCustomReasonChange = (e) => {
    setSelectedReason("");
    setReason(e.target.value);
  };

  // Handle submit
  const handleSubmit = () => {
    if (!selectedReason && !reason) {
      alert("Please specify a reason for the refund.");
      return;
    }
    onSubmit();
  };

  // Only render modal if open is true
  if (!open) return null;

  return (
    <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
      <div className="w-[50%] bg-white shadow-lg rounded-lg p-5 relative">
        <RxCross1 size={30} className="absolute top-4 right-4 cursor-pointer" onClick={onClose} />
        <h2 className="text-[30px] font-semibold text-center">Request Refund</h2>
        <br />
        <label className="block text-[20px] font-[500]">
          Reason for Refund <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col mt-2">
          <label className="block">
            <input
              type="radio"
              name="refundReason"
              value="Received a defective item"
              checked={selectedReason === "Received a defective item"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Received a defective item
          </label>
          <label className="block mt-2">
            <input
              type="radio"
              name="refundReason"
              value="Wrong item received"
              checked={selectedReason === "Wrong item received"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Wrong item received
          </label>
          <label className="block mt-2">
            <input
              type="radio"
              name="refundReason"
              value="Item not as described"
              checked={selectedReason === "Item not as described"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Item not as described
          </label>
          <label className="block mt-2">
            <input
              type="radio"
              name="refundReason"
              value="Changed my mind"
              checked={selectedReason === "Changed my mind"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Changed my mind
          </label>
          <label className="block mt-2">
            <input
              type="radio"
              name="refundReason"
              value="Other"
              checked={selectedReason === "Other"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Other
          </label>
        </div>
        {selectedReason === "Other" && (
          <textarea
            value={reason}
            onChange={handleCustomReasonChange}
            className="mt-2 w-full border p-3 rounded-md outline-none"
            rows="5"
            placeholder="Please specify your reason for the refund"
          />
        )}
        <br />
        <div className="flex justify-center">
          <button
            className={`${styles.button} text-white text-[20px]`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundReasonModal;

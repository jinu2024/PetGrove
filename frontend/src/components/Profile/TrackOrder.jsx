import React from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { UserOrderState } from '../../recoil/atoms/userorder';
import { userState } from '../../recoil/atoms/user';
import { backend_url } from '../../server';

const statuses = [
    "Processing",
    "Transferred to delivery partner",
    "Shipping",
    "Received",
    "On the way",
    "Delivered",
];

const refundStatuses = [
    "Processing refund",
    "Refund Approved",
    "Refunded",
];

const TrackOrder = () => {
    const { id } = useParams();
    const allOrders = useRecoilValue(UserOrderState);
    const user = useRecoilValue(userState);

    const order = allOrders && allOrders.find((item) => item._id === id);

    // Determine if it's a refund case
    const isRefundCase = refundStatuses.includes(order?.status);
    const currentStatusIndex = isRefundCase
        ? refundStatuses.indexOf(order?.status)
        : statuses.indexOf(order?.status);

    // Helper function to format date into readable form
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Map through products in the order */}
            {order?.cart?.map((product, index) => (
                <div key={index} className="mb-6">
                    {/* Product Info */}
                    <div className="flex items-center mb-4">
                        <img
                            src={`${backend_url}/${product?.images[0]}`}
                            alt={product?.name}
                            className="w-24 h-24 object-cover rounded-lg shadow-md"
                        />
                        <div className="ml-4">
                            <h2 className="text-2xl font-semibold text-gray-800">{product?.name}</h2>
                        </div>
                    </div>
                </div>
            ))}

            {/* Combined Status Timeline for the entire order */}
            <div className="flex items-start space-x-4">
                <div className="relative">
                    <div className={`absolute h-full w-0.5 ${isRefundCase ? 'bg-red-500' : 'bg-green-500'} left-2 top-0 z-0`}></div>
                    {(isRefundCase ? refundStatuses : statuses).map((status, index) => (
                        <div key={index} className="relative z-10 mb-8 flex items-start">
                            {/* Status Circle */}
                            <div className={`w-4 h-4 rounded-full ${index <= currentStatusIndex ? (isRefundCase ? 'bg-red-500' : 'bg-green-500') : 'bg-gray-300'} border-2 ${isRefundCase ? 'border-red-500' : 'border-green-500'}`}></div>
                            <div className="ml-4">
                                <p className={`font-semibold ${index <= currentStatusIndex ? (isRefundCase ? 'text-red-700' : 'text-green-700') : 'text-gray-500'}`}>
                                    {status}
                                </p>
                                {index === 0 && (
                                    <p className="text-sm text-gray-500">{`Order placed on: ${formatDate(order?.createdAt)}`}</p>
                                )}
                                {index === statuses.length - 1 && order?.deliveredAt && (
                                    <p className="text-sm text-gray-500">{`Delivered on: ${formatDate(order?.deliveredAt)}`}</p>
                                )}
                                {index <= currentStatusIndex && index !== 0 && index !== statuses.length - 1 && (
                                    <p className="text-sm text-gray-500">{`Updated on: ${new Date().toLocaleDateString()}`}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Details */}
                <div className="flex-grow">
                    <p className="text-sm text-gray-500">
                        Order placed on: {formatDate(order?.createdAt)}
                    </p>
                    {isRefundCase && (
                        <p className="text-sm text-red-500 mt-4">
                            Your order is in the refund process.
                        </p>
                    )}
                    {/* Additional Order Info */}
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;

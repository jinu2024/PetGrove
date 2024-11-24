import React, { useState } from 'react';
import useGetSellerAllOrders from '../../hooks/Shop/getSellerAllOrders';
import { Link } from 'react-router-dom';
import { backend_url } from '../../server';
import { FaArrowRight } from 'react-icons/fa'; // Import the arrow icon

const AllOrders = () => {
    const { sellerOrders, loading } = useGetSellerAllOrders();
 
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 6; // Adjust this value as needed

    // Calculate the index of the first and last orders for the current page
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = sellerOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(sellerOrders.length / ordersPerPage);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto pl-4 pt-1 space-y-4">
            {/* Orders List */}
            {currentOrders.map((order) => (
                <div
                    key={order._id}
                    className="bg-white p-2 border border-gray-200 rounded-md shadow-md flex items-center justify-between w-full h-20 mt-2"
                >
                    {/* Cart Items */}
                    <div className="flex items-center space-x-4">
                        {order.cart.slice(0, 1).map((item, index) => (
                            <div key={index} className="flex items-center">
                                <img
                                    src={`${backend_url}/${item.images[0]}`}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                                <div className="ml-2">
                                    <p className="text-sm font-medium truncate sm:max-w-[200px] max-w-[80px] sm:whitespace-normal">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="flex-grow flex flex-col items-end justify-center ml-4 mr-2">
                        <h3 className="text-sm font-semibold text-right">Order: #{order._id.slice(0, 8)}...</h3>
                        <p className={`text-xs text-right ${order.status === 'Delivered' ? 'text-green-500' : 'text-orange-500'}`}>
                            {order.status}
                        </p>
                        <p className="text-xs text-gray-600 text-right">Total: US$ {order.totalPrice}</p>
                    </div>

                    {/* Action Arrow Icon (Kicpoon) */}
                    <Link to={`/user/order/${order._id}`} className="ml-2">
                        <FaArrowRight className="text-blue-500 text-lg cursor-pointer" />
                    </Link>
                </div>
            ))}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100"
                >
                    Previous
                </button>
                <span className="mx-2 mt-3 text-sm">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllOrders;

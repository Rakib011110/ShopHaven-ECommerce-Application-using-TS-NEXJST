"use client";

import React, { useState } from "react";
import {
  useGetOrderHistoryQuery,
  useUpdateOrderStatusMutation,
} from "@/src/redux/api/orderApi";
import { Image } from "@nextui-org/image";

const MyOrder = () => {
  const { data, isLoading, error } = useGetOrderHistoryQuery({});
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [newStatus, setNewStatus] = useState<string>("COMPLETED");

  // Pagination states
  const itemsPerPage = 5; // Number of orders per page
  const [currentPage, setCurrentPage] = useState<number>(1);

  if (isLoading) return <p>Loading...</p>;

  // Handle pagination
  const totalPages = Math.ceil(data?.data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data?.data.slice(startIndex, startIndex + itemsPerPage);

  const handleStatusUpdate = async (orderId: string) => {
    try {
      await updateOrderStatus({ orderId, status: newStatus }).unwrap();
      alert("Order status updated successfully!");
    } catch (err) {
      alert("Failed to update order status");
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>

      {paginatedData?.length > 0 ? (
        paginatedData.map((order: any) => (
          <div
            key={order.id}
            className="border border-gray-300 rounded-md shadow-lg mb-6 p-4">
            {/* Order Summary */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-500">
                Order Number: {order.orderNumber}
              </h3>
              <p className="text-gray-600">
                Total Amount: ${order.totalAmount}
              </p>
              <p className="text-gray-600">
                Payment Status:{" "}
                <span
                  className={`font-medium ${
                    order.paymentStatus === "PAID"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}>
                  {order.paymentStatus}
                </span>
              </p>
              <p className="text-gray-600">
                Status:{" "}
                <span
                  className={`font-medium ${
                    order.status === "PENDING"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}>
                  {order.status}
                </span>
              </p>
            </div>

            {/* Order Items */}
            <div>
              {order.orderItems.map((item: any) => (
                <div key={item.id} className="flex items-center mb-3">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: ${item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Update Order Status */}
            <div className="mt-4">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="p-2 border rounded">
                <option value="PENDING">PENDING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="SHIPPED">SHIPPED</option>
              </select>
              <button
                onClick={() => handleStatusUpdate(order.id)}
                className="ml-4 p-2 bg-blue-500 text-white rounded">
                Update Status
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
            disabled={currentPage === 1}>
            Previous
          </button>
          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
            disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyOrder;

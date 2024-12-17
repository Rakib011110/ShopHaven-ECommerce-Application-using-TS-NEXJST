"use client";
import React, { useState } from "react";

import { useGetAllOrdersQuery } from "@/src/redux/api/orderApi";

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const { data: ordersData, isLoading, isError } = useGetAllOrdersQuery({}); // Fetch all orders at once

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full p-4">
        <div className="text-lg font-semibold">Loading orders...</div>
      </div>
    );
  }

  if (isError || !ordersData?.data?.orders?.length) {
    return (
      <div className="flex justify-center items-center h-full p-4">
        <div className="text-lg font-semibold text-red-600">
          No orders found or failed to load orders.
        </div>
      </div>
    );
  }

  // Frontend Pagination Logic
  const orders = ordersData.data.orders; // All orders fetched
  const totalOrders = orders.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  // Slice orders for the current page
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Change page handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-center mb-6">Transactions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedOrders.map((order: any) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Order #{order.orderNumber}
                </h2>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    order.paymentStatus === "PAID"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}>
                  {order.paymentStatus}
                </span>
              </div>
              <p className="text-gray-600">
                Order ID: <span className="font-bold">{order.id}</span>
              </p>
              <p className="text-gray-600">
                Total Amount:{" "}
                <span className="font-semibold text-lg">
                  ${order.totalAmount}
                </span>
              </p>
              <p className="text-gray-600">
                Order Status:{" "}
                <span
                  className={`font-bold ${
                    order.status === "COMPLETED"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}>
                  {order.status}
                </span>
              </p>
              <p className="text-gray-600">
                Created At:{" "}
                <span className="font-semibold">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </p>
              <p className="text-gray-600">
                Updated At:{" "}
                <span className="font-semibold">
                  {new Date(order.updatedAt).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}

        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Transactions;

"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

import { useGetAllOrdersQuery } from "@/src/redux/api/orderApi"; // Adjust the import based on your project structure
import { useGetAllCustomerReviewsQuery } from "@/src/redux/api/ReviewAPI";
import { useGetAllProductsQuery } from "@/src/redux/api/productApi";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Define TypeScript types for Order
interface Order {
  id: string;
  orderNumber: string;
  paymentStatus: "PAID" | "UNPAID" | "REFUNDED"; // Adjust based on actual API values
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED"; // Adjust as needed
  totalAmount: number;
  createdAt: string; // ISO date string
}

const Admin: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ordersPerPage = 5;

  const { data: ordersData, isLoading, isError } = useGetAllOrdersQuery({});
  const { data: products } = useGetAllProductsQuery({});
  console.log(products);
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

  const orders: Order[] = ordersData.data.orders;
  const totalOrders = orders.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  // Pagination logic
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Data preparation for charts
  const paymentStatusCounts = orders.reduce<Record<string, number>>(
    (acc, order) => {
      acc[order.paymentStatus] = (acc[order.paymentStatus] || 0) + 1;

      return acc;
    },
    {}
  );

  const orderStatusCounts = orders.reduce<Record<string, number>>(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;

      return acc;
    },
    {}
  );

  const paymentStatusChart: ApexOptions = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },
    labels: Object.keys(paymentStatusCounts),
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
          },
          legend: { position: "bottom" },
        },
      },
    ],
    legend: { position: "right" },
    colors: ["#28a745", "#dc3545", "#ffc107"],
  };

  const orderStatusChart: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    xaxis: {
      categories: Object.keys(orderStatusCounts),
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    dataLabels: { enabled: false },
    colors: ["#007bff", "#28a745", "#ffc107"],
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-center mb-6">Transactions</h1>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            Payment Status Distribution
          </h2>
          <Chart
            height={300}
            options={paymentStatusChart}
            series={Object.values(paymentStatusCounts)}
            type="donut"
          />
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Order Status Distribution</h2>
          <Chart
            height={300}
            options={orderStatusChart}
            series={[{ data: Object.values(orderStatusCounts) }]}
            type="bar"
          />
        </div>
      </div>

      {/* Orders Grid */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                Order Number
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                Payment Status
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                Order Status
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                Total Amount
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order: Order, index: number) => (
              <tr
                key={order.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition duration-200`}>
                <td className="py-3 px-4 text-gray-800 font-medium">
                  #{order.orderNumber}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-sm font-medium rounded-full ${
                      order.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`font-semibold ${
                      order.status === "COMPLETED"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700">
                  ${order.totalAmount.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
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

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
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

export default Admin;

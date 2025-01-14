"use client";

import { Link } from "@nextui-org/link";
import { Button, Image } from "@nextui-org/react";
import React, { useState } from "react";

import { useGetAllProductsQuery } from "@/src/redux/api/productApi";
import CardButton from "@/src/components/UI/CardButton/CardButton";
import Loading from "@/src/components/UI/Loading/Loading";

const RecentProducts = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8; // Number of items per page

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-700">
          <Loading />
        </h2>
      </div>
    );
  }

  if (isError || !data?.data || data.data.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-700">
          No products available.
        </h2>
      </div>
    );
  }

  // Sort products by creation date and get the most recent 10
  const recentProducts = [...data.data]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 10);

  // Filter products based on the search term
  const filteredProducts = recentProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div>
        <div className="max-w-screen-xl mx-auto mt-10">
          <div className="max-w-screen-xl mx-auto flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Recent <span className="text-blue-600">products</span>
              </h2>
              <p className="text-gray-500 text-sm">
                Discover the most recent products added to our store.
              </p>
            </div>
            <div>
              {/* Search Input */}
              <input
                className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Search products..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {paginatedProducts.map((product: any) => (
              <div
                key={product.id}
                className="border mx-auto border-blue-600 rounded-xl bg-white shadow-md p-4 relative">
                {/* New Product Tag */}
                <span className="absolute top-1 left-7 bg-red-600 text-white text-xs font-bold py-1 px-2 rounded">
                  New
                </span>
                <div className="flex justify-center">
                  <Image
                    alt={product.name}
                    className="h-64 max-w-full mx-auto border-b p-3 border-blue-800 object-cover rounded-md mb-4"
                    src={product.image || "https://via.placeholder.com/150"}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold mb-2">
                  Price: ${product.price}
                </p>
                <p className="text-sm text-green-600 mb-4">
                  Discount: ${product.discount}
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    className="text-blue-600 text-sm font-medium"
                    href={`/product/${product.id}`}>
                    <CardButton text="Details" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {/* No results message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-10">
              <h2 className="text-lg font-medium text-gray-600">
                No products match your search.
              </h2>
            </div>
          )}

          {/* Pagination Controls */}
          {filteredProducts.length > itemsPerPage && (
            <div className="flex justify-center items-center mt-8">
              <button
                className={`px-4 py-2 mr-2 border rounded ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}>
                Previous
              </button>
              <span className="text-gray-700 mx-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`px-4 py-2 ml-2 border rounded ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentProducts;

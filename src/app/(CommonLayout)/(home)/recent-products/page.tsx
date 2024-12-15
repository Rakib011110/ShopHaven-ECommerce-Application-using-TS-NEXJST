"use client";

import { Link } from "@nextui-org/link";
import { Button, Image } from "@nextui-org/react";
import React from "react";
import Zoom from "react-medium-image-zoom";

import { useGetAllProductsQuery } from "@/src/redux/api/productApi";

const RecentProducts = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery({});

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-700">
          Loading products...
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

  return (
    <div>
      <div className="container flex justify-center mx-auto">
        <Image
          isBlurred
          alt="NextUI Album Cover   "
          className="  "
          src="https://t3.ftcdn.net/jpg/02/20/25/48/360_F_220254823_gTvIc9Zdtkao68XrcTnlogHXMmBYDIEj.jpg"
        />
      </div>
      <div>
        <div className=" rounded-3xl mt-15 container mx-auto"></div>

        <div className="max-w-screen-xl mx-auto py-10">
          <h1 className="text-3xl font-bold text-center mb-8">
            Recent Products
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {recentProducts.map((product: any) => (
              <div
                key={product.id}
                className="border mx-auto border-blue-600 rounded-xl bg-white shadow-md p-4">
                <div className="flex justify-center">
                  <Image
                    alt={product.name}
                    className="h-64 max-w-full  mx-auto border p-3 border-blue-800 object-cover rounded-md mb-4"
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
                    className="text-blue-600 underline text-sm font-medium"
                    href={`/product/${product.id}`}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentProducts;

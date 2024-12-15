"use client";

import { useGetAllProductsQuery } from "@/src/redux/api/productApi";
import { Link } from "@nextui-org/link";
import { Button, Image } from "@nextui-org/react";
import React from "react";
import Zoom from "react-medium-image-zoom";

const FlashSales = () => {
  const { data, isLoading, error } = useGetAllProductsQuery({});

  return (
    <div>
      <div className="bg-[#03030af6] rounded-3xl mt-15">
        <div className="max-w-screen-2xl mx- mx-auto h-[600px] ">
          {/* Background video */}
          <video
            className="  mx-auto w-full h-full "
            src="https://res.cloudinary.com/dqp2vi7h1/video/upload/v1733938593/Modern_Black_Friday_Video_r5bkn0.mp4"
            autoPlay
            loop
            muted
          />
          {/* Overlay */}
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg  p-6 mx-auto">
          {data?.data?.map((product: any) => (
            <div
              key={product.id}
              className="border mx-auto border-blue-600 rounded-xl bg-white shadow-md p-4">
              <div>
                <Image
                  alt={product.name}
                  className="h-64 max-w-full mx-auto border p-3 border-blue-800 object-cover rounded-md mb-4 "
                  src={product.image}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold mb-4">${product.price}</p>
              <p className="text-lg font-bold mb-4">
                Discount ${product.discount}
              </p>
              <Link
                className="flex justify-between"
                href={`/product/${product.id}`}>
                <Button>Vew details</Button>
                <Button className="h-7 bg-red-500 border border-blue-400 text-white font-serif ">
                  flash sales
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashSales;

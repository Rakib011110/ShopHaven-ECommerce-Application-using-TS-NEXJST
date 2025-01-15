"use client";

import { Link } from "@nextui-org/link";
import { Button, Image } from "@nextui-org/react";
import React from "react";

import { useGetAllProductsQuery } from "@/src/redux/api/productApi";
import CardButton from "@/src/components/UI/CardButton/CardButton";

const FlashSales = () => {
  const { data, isLoading, error } = useGetAllProductsQuery({});

  // Function to shuffle and select 8 random products
  const getRandomProducts = (products: any[]) => {
    const shuffled = [...products].sort(() => Math.random() - 0.5); // Copy before sorting
    return shuffled.slice(0, 8);
  };

  // Handle loading and errors
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products!</div>;

  const randomProducts = data?.data ? getRandomProducts(data.data) : [];

  return (
    <div>
      <div className="bg-[#03030af6] rounded-md mt-15">
        <div className="max-w-screen-2xl mx-auto h-[600px]">
          {/* Background video */}
          <video
            autoPlay
            loop
            muted
            className="mx-auto w-full h-full"
            src="https://res.cloudinary.com/dqp2vi7h1/video/upload/v1733938593/Modern_Black_Friday_Video_r5bkn0.mp4"
          />
        </div>
      </div>
      <div>
        <div className="grid container grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  p-6 mx-auto">
          {randomProducts.map((product: any) => (
            <div
              key={product.id}
              className="border mx-auto border-blue-600 rounded-xl  bg-opacity-40 bg-[#a5cfff] shadow-md p-4">
              <div>
                <Image
                  alt={product.name}
                  className="h-64 w-72 mx-auto items-center border-b  border-blue-800  rounded-md mb-4"
                  src={product.image}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className=" mb-2">{product.description}</p>
              <p className="text-lg font-bold mb-4">${product.price}</p>
              <p className="text-lg font-bold mb-4">
                Discount: ${product.discount}
              </p>
              <Link
                className="flex justify-between"
                href={`/product/${product.id}`}>
                <CardButton text={"Details"} />

                <Button className="h-7 bg-green-500 border border-blue-400 text-white font-serif">
                  Flash Sale
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

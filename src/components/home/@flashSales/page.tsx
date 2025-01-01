"use client";
import { FaTags, FaClock } from "react-icons/fa";

import CardButton from "../../UI/CardButton/CardButton";

import Title from "@/src/lib/utils/Title";
import { useGetAllProductsQuery } from "@/src/redux/api/productApi";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/react";

const FlashSales: React.FC = () => {
  const { data: products } = useGetAllProductsQuery({
    limit: 4,
    page: 1,
    sort: "createdAt:desc",
  });

  return (
    <div className="mt-44 max-h-[800px] container mx-auto px-4 flex flex-col lg:flex-row gap-8 items-stretch">
      {/* Left Section: Product Cards */}
      <div className="flex-[1.7] flex flex-col">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2">Black Friday Flash Sales</h2>

          <p className="text-gray-500">
            Grab Your Favorites Before They are Gone!
          </p>
          <Link href="/flashSales" className="">
            <CardButton text="View All" />
          </Link>
        </div>

        {/* Tabs */}

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {products?.data?.slice(0, 6).map((product: any) => (
            <div
              key={product.id}
              className="bg-[#a5cfff] border-blue-600 bg-opacity-30 rounded-lg shadow hover:shadow-lg transition h-full flex flex-col">
              <div className="relative p-1 rounded-lg mx-auto">
                <Image
                  alt={product.name}
                  className="rounded-lg border-b border-blue-700 w-full p-1 h-[200px]"
                  height={150}
                  src={product.image}
                  width={200}
                />
              </div>
              <div className="p-3 flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-500">${product.price.toFixed(2)}</p>
              </div>
              <div className="p-2">
                <CardButton text="Details" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Hero Model */}
      <div className="flex-1">
        <div className="w-full h-full">
          <video
            height={900}
            autoPlay
            width={1000}
            loop
            muted
            className="w-full h-full object-cover">
            <source
              src="https://res.cloudinary.com/dqp2vi7h1/video/upload/v1735720455/Black_and_White_Animated_Black_Friday_Sale_Instagram_Story_xsgw9f.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  );
};

export default FlashSales;

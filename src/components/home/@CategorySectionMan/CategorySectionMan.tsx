"use client";
import Image from "next/image";

import CardButton from "../../UI/CardButton/CardButton";
import { useGetAllProductsQuery } from "@/src/redux/api/productApi";
import { IProduct } from "@/src/lib/utils/apitypes";
import { useState } from "react";

interface Product extends IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  imageUrl: string;
  rating: number;
}

const CategorySectionMan = () => {
  // Fake product data
  const Cardproducts = [
    {
      id: 1,
      name: "Apple iPad With Retina",
      price: "£60.00",
      image:
        "https://www.apple.com/newsroom/images/product/ipad/standard/apple_ipad-pro-spring21_hero_04202021_big.jpg.large.jpg",
      discount: "-7%",
    },
    {
      id: 2,
      name: "Marshall Portable Bluetooth",
      price: "£96.00",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0dEDxgsVH2NjQCZ1pU_-hMHM7NVziUEPDkA&s",
      discount: "-7%",
    },
    {
      id: 3,
      name: "Beats Solo2 Solo 2",
      price: "£60.00",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/662f0930d15a7cc281b6f18ceac7f081.jpg_720x720q80.jpg",
    },
    {
      id: 4,
      name: "Stylish Hoodie",
      price: "£40.00",
      image:
        "https://images.othoba.com/images/thumbs/0659875_new-stylish-hoodie-with-pant-for-man-latest-winter-trends-elevate-your-cold-weather-wardrobe_400.webp",
      isNew: true,
    },
    {
      id: 5,
      name: "Warm Jacket",
      price: "£75.00",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkpVivp_QGKs4dC5llarfRimBCgnb0Ei7MuQ&s",
    },
    {
      id: 6,
      name: "Lightweight Vest",
      price: "£50.00",
      image:
        "https://www.careofcarl.com/bilder/artiklar/zoom/20657711r_1.jpg?m=1669119158",
    },
  ];
  const { data, isLoading, error } = useGetAllProductsQuery({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const products: Product[] =
    (data?.data.map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.image,
      stock: product.stock,
      rating: product.rating,
    })) as Product[]) || [];

  if (isLoading) {
    return <div className="text-center text-lg">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg">
        Failed to load products. Please try again later.
      </div>
    );
  }

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : [];
  console.log("filteredProducts", filteredProducts);

  return (
    <div className="mt-20  container mx-auto px-4 flex flex-col lg:flex-row gap-8 items-stretch">
      {/* Left Section: Product Cards */}
      <div className="flex-[1.3] flex flex-col">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2">For Men’s Collection</h2>
          <p className="text-gray-500">Choose your products</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-8 mb-8 text-lg font-semibold">
          <button className="text-orange-600 border-b-2 border-orange-600">
            Clothing
          </button>
          <button className="hover:text-orange-600">Handbag</button>
          <button className="hover:text-orange-600">Shoes</button>
          <button className="hover:text-orange-600">Accessories</button>
        </div>

        {/* Product Cards */}
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {Cardproducts.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="bg-[#a5cfff] border-blue-600  bg-opacity-30 rounded-lg shadow hover:shadow-lg transition h-full flex flex-col">
              <div className="relative p-1 rounded-lg mx-auto">
                <Image
                  alt={product.name}
                  className="rounded-lg h-[200px]"
                  height={200}
                  src={product.image}
                  width={200}
                />
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-orange-500 text-white text-sm px-2 py-1 rounded">
                    {product.discount}
                  </span>
                )}
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-sm px-2 py-1 rounded">
                    New
                  </span>
                )}
              </div>
              <div className="p-3  flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-500">{product.price}</p>
              </div>
              <div className="p-2">
                <CardButton text=" Details" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Hero Model */}
      <div className="flex-1">
        <div className="w-full  h-full">
          <Image
            alt="Model"
            className="object-cover rounded-lg shadow-lg h-full"
            height={900}
            src="https://htmldemo.net/reid/reid/assets/img/bg/banner4.jpg"
            width={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default CategorySectionMan;

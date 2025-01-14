"use client";

import CardButton from "@/src/components/UI/CardButton/CardButton";
import { IProduct } from "@/src/lib/utils/apitypes";
import { useGetAllProductsQuery } from "@/src/redux/api/productApi";
import { Link } from "@nextui-org/react";
import Image from "next/image";
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

const CategorySectionWoman = () => {
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

  const hardcodedCategories = ["Clothing", "Handbag", "Shoes", "Accessories"];

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  // Fake product data
  // const products = [
  //   {
  //     id: 1,
  //     name: "Elegant Red Dress",
  //     price: "£80.00",
  //     image:
  //       "https://www.riccoindia.com/cdn/shop/products/3D7091A0-317F-4D0D-846D-B11C6E031966_580x.jpg?v=1657705803",
  //     discount: "-10%",
  //   },
  //   {
  //     id: 2,
  //     name: "Leather Handbag",
  //     price: "£120.00",
  //     image:
  //       "https://img4.dhresource.com/webp/m/0x0/f3/albu/jc/o/24/ec4023b8-d420-401c-ada3-25d1593077ac.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "High-Heeled Shoes",
  //     price: "£95.00",
  //     image:
  //       "https://i.pinimg.com/736x/88/be/95/88be959b8a6432069cecacd037a2278e.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "Stylish Sunglasses",
  //     price: "£40.00",
  //     image:
  //       "https://m.media-amazon.com/images/I/617yt3E9ejL._AC_UF894,1000_QL80_.jpg",
  //     isNew: true,
  //   },
  //   {
  //     id: 5,
  //     name: "Silk Scarf",
  //     price: "£25.00",
  //     image:
  //       "https://i.etsystatic.com/52554993/r/il/0fe3c2/6117470591/il_fullxfull.6117470591_lxs4.jpg",
  //     discount: "-5%",
  //   },
  //   {
  //     id: 6,
  //     name: "Luxury Necklace",
  //     price: "£200.00",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07xq7I794WxniatiW8_BkE9of0Y5m7BVqig&s",
  //   },
  // ];

  return (
    <div className="mt-20 mb-10 container mx-auto px-4 flex flex-col lg:flex-row gap-8 items-stretch">
      {/* Left Section: Hero Model */}
      <div className="flex-1">
        <div className="w-full h-full">
          <Image
            alt="Model"
            className="object-cover rounded-lg shadow-lg h-full"
            height={800}
            src="https://htmldemo.net/reid/reid/assets/img/bg/banner2.jpg"
            width={1000}
          />
        </div>
      </div>

      {/* Right Section: Product Cards */}
      <div className="flex-[1.3] flex flex-col">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2">For Women’s Collection</h2>
          <p className="text-gray-500">Choose your products</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-8 mb-8 text-lg font-semibold">
          {hardcodedCategories.map((category) => (
            <button
              key={category}
              className={`${
                selectedCategory === category
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "hover:text-orange-600"
              }`}
              onClick={() => handleCategoryClick(category)}>
              {category}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {filteredProducts.slice(4, 10).map((product) => (
            <div
              key={product.id}
              className="bg-[#FFC0CB]  bg-opacity-25 border-blue-600  rounded-lg shadow hover:shadow-lg transition h-full flex flex-col">
              <div className="relative p-1 rounded-lg mx-auto">
                <Image
                  alt={product.name}
                  className="rounded-lg border-b border-blue-700 w-full p-1 h-[150px]"
                  height={150}
                  src={product.imageUrl}
                  width={200}
                />
              </div>
              <div className="p-3 flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-500">${product.price.toFixed(2)}</p>
              </div>
              <div className="p-2">
                <Link
                  className="text-blue-600 text-sm font-medium"
                  href={`/product/${product.id}`}>
                  <CardButton text="Details" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySectionWoman;

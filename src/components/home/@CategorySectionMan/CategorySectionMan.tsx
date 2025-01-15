"use client";
import Image from "next/image";
import CardButton from "../../UI/CardButton/CardButton";
import { useGetAllProductsQuery } from "@/src/redux/api/productApi";
import { IProduct } from "@/src/lib/utils/apitypes";
import { useState, useEffect } from "react";
import { Link } from "@nextui-org/react";
import AOS from "aos";
import "aos/dist/aos.css";
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
  const { data, isLoading, error } = useGetAllProductsQuery({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });

    AOS.refresh();
  }, []);

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

  return (
    <div className="mt-20 mb-10 container mx-auto px-4 flex flex-col lg:flex-row gap-8 items-stretch">
      {/* Left Section: Product Cards */}
      <div className="flex-[1.5] flex flex-col">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2">For Men’s Collection</h2>
          <p className="text-gray-500">Choose your products</p>
        </div>

        {/* Tabs */}
        <div
          data-aos="zoom-in"
          className="flex  justify-center space-x-8 mb-8 text-lg font-semibold">
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
          {filteredProducts.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="bg-[#a5cfff] border-blue-600 bg-opacity-30 rounded-lg shadow hover:shadow-lg transition h-full flex flex-col">
              <div className="relative p-1 rounded-lg mx-auto">
                <Image
                  alt={product.name}
                  className="rounded-lg border-b border-blue-700 w-54 p-1 h-[190px]"
                  height={200}
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

      {/* Right Section: Hero Model */}
      <div className="flex-1">
        <div className="w-full h-full">
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

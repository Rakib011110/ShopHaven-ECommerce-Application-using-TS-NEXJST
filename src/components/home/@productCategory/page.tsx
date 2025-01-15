/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */
"use client";

import { IProduct } from "@/src/lib/utils/apitypes";
import { useGetAllProductsQuery } from "@/src/redux/api/productApi";
import Title from "@/src/lib/utils/Title";
import { useState } from "react";
import { Button, Image } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import CardButton from "../../UI/CardButton/CardButton";
import ProductCard from "@/src/pages/ProductsCard/ProductsCard";

// Define the Product interface to match the IProduct type used in your API.
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

const Categories: React.FC = () => {
  // Fetch products using the query hook
  const { data, isLoading, error } = useGetAllProductsQuery({});

  // console.log(data);
  const products: Product[] =
    data?.data.map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.image,
      stock: product.stock,
      rating: product.rating,
    })) || [];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Handle loading and error states
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

  // Extract unique categories from products for display
  const uniqueCategories: string[] = Array.from(
    new Set(products.map((product) => product.category))
  );

  // Filter products based on the selected category
  const filteredProducts: Product[] = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : [];

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category); // Toggle selection
  };

  return (
    <div className="container mx-auto px-4 mt-16">
      {/* Categories Section */}
      <Title
        bigTitle={"YOUR FAVOURITE CATEGORY"}
        smallTitle={"Click here for category"}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-12">
        {uniqueCategories?.slice(0, 6).map((category) => {
          const categoryImage = products.find(
            (product) => product.category === category
          )?.imageUrl;

          return (
            <div
              key={category}
              className={`relative rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 cursor-pointer`}
              onClick={() => handleCategoryClick(category)}>
              {/* Background Image */}
              {categoryImage && (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${categoryImage})`,
                  }}
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 hover:bg-opacity-30 transition-all"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-blue-100 backdrop-blur-sm p-4">
                <h2 className="text-lg font-semibold mb-2">{category}</h2>
                <Link
                  href={`/all-product?category=${encodeURIComponent(category)}`}
                  className="inline-block px-4 py-2 text-sm font-medium  rounded-lg shadow backdrop-blur-sm text-white transition-colors">
                  Show All
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Products Section */}
      {selectedCategory && (
        <div>
          {/* <h2 className="text-center text-2xl font-bold mb-6">
            {selectedCategory}
          </h2> */}
          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts
                ?.slice(0, 4)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    description={product.description}
                    id={product.id}
                    image={product?.imageUrl || ""}
                    link={`/product/${product.id}`}
                    name={product.name}
                    price={product.price}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              No products found in this category.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;

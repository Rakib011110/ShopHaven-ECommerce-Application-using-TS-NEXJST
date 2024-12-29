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
    <div className="container mx-auto px-4 mt-40">
      {/* Categories Section */}
      <Title
        bigTitle={"YOUR FAVOURITE CATEGORY"}
        smallTitle={"Click here for category"}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {uniqueCategories.map((category) => {
          const categoryImage = products.find(
            (product) => product.category === category
          )?.imageUrl;

          return (
            // Unique key prop is based on the category name
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              key={category}
              className={`rounded-full p-2 border-b-2 ${
                selectedCategory === category
                  ? "border-green-500 shadow-lg"
                  : "border-gray-300"
              } hover:shadow-xl transition-shadow cursor-pointer text-center`}
              onClick={() => handleCategoryClick(category)}>
              <h2 className="text-xl font-semibold">
                {category}
                <br />
                <Link
                  className=""
                  href={`/all-product?category=${encodeURIComponent(category)}`}>
                  <CardButton text="Show all" />
                </Link>
              </h2>
              {/* {categoryImage ? (
                <Image
                  alt={category}
                  className="w-full h-20 object-cover rounded-full mt-4"
                  src={categoryImage}
                />
              ) : (
                <div className="w-full h-20 bg-gray-200 rounded-full mt-4 flex items-center justify-center">
                  <span>No Image</span>
                </div>
              )} */}
            </div>
          );
        })}
      </div>

      {/* Products Section */}
      {selectedCategory && (
        <div>
          <h2 className="text-center text-2xl font-bold mb-6">
            {selectedCategory}
          </h2>
          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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

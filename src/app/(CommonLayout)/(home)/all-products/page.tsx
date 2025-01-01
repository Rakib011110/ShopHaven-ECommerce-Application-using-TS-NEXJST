"use client";

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import { Image } from "@nextui-org/react";
import { Link } from "@nextui-org/link";

import { useGetAllProductsQuery } from "@/src/redux/api/productApi";
import Title from "@/src/lib/utils/Title";
import CardButton from "@/src/components/UI/CardButton/CardButton";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const AllProducts = () => {
  const { data, isLoading, error } = useGetAllProductsQuery({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);
  const [showWarning, setShowWarning] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category || null);
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const newValue = Number(e.target.value);

    setPriceRange((prev) =>
      type === "min" ? [newValue, prev[1]] : [prev[0], newValue]
    );
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc" | null);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setPriceRange([0, 1000]);
    setSortOrder(null);
    setVisibleCount(10);
  };

  const products: Product[] =
    data?.data.map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
    })) || [];

  // Filter, sort, and slice products
  const filteredProducts = products
    .filter(
      (product: Product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product: Product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .filter(
      (product: Product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a: Product, b: Product) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;

      return 0;
    });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const handleCompare = (product: Product) => {
    if (comparisonProducts.length < 3) {
      if (
        comparisonProducts.length > 0 &&
        comparisonProducts[0].category !== product.category
      ) {
        setShowWarning(true);

        return;
      }
      setComparisonProducts([...comparisonProducts, product]);
    } else {
      setShowWarning(true);
    }
  };

  const closeWarning = () => setShowWarning(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="container mx-auto p-6 ">
      <Title bigTitle={"OUR PRODUCT"} smallTitle={"Choose your products"} />

      <div className="grid grid-cols-4 gap-4">
        {/* Filters */}
        <div className="col-span-1 border p-4 rounded bg-gray-50">
          <input
            className="border px-4 py-2 rounded w-full mb-4"
            placeholder="Search products..."
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <select
            className="border px-4 py-2 rounded w-full mb-4"
            value={selectedCategory || ""}
            onChange={(e) => handleCategoryChange(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Outdoor Essentials">Outdoor Essentials</option>
            <option value="Tech & Gadgets">Tech & Gadgets</option>
            <option value="Fashion & Lifestyle">Fashion & Lifestyle</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
          </select>

          <div className="flex gap-2 mb-4">
            <input
              className="border px-4 py-2 rounded w-full"
              placeholder="Min Price"
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, "min")}
            />
            <input
              className="border px-4 py-2 rounded w-full"
              placeholder="Max Price"
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, "max")}
            />
          </div>
          <select
            className="border px-4 py-2 rounded w-full mb-4"
            onChange={handleSortChange}>
            <option value="">Sort by Price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <button
            className="border px-4 py-2 rounded font-semibold bg-[#04ecec] animate-bounce font-semibol  w-full"
            onClick={resetFilters}>
            Clear Filters
          </button>
        </div>

        {/* Product Grid */}
        <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.map((product: Product) => (
            <div
              key={product.id}
              className="border bg-[#a5cfff] border-blue-600 rounded-xl  bg-opacity-20  shadow-md p-4">
              <div className="flex justify-center">
                <Image
                  alt={product.name}
                  className="h-40 w-full border p-3 border-blue-800 object-cover rounded-md mb-4"
                  src={product.image}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold mb-4">${product.price}</p>
              <div className="flex gap-2">
                <Link href={`/product/${product.id}`}>
                  <CardButton text="details" />
                </Link>
                <button
                  className="border px-4 py-2 rounded bg-green-600 text-white"
                  onClick={() => handleCompare(product)}>
                  Compare
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Show More Button */}
      {visibleCount < filteredProducts.length && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={loadMore}>
            Show More
          </button>
        </div>
      )}

      {/* Comparison Modal */}
      {comparisonProducts.length > 0 && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
          onClick={(e) =>
            e.target === e.currentTarget && setComparisonProducts([])
          }>
          <div className="bg-white rounded-lg p-6 w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Compare Products</h3>
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setComparisonProducts([])}>
                &times;
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {comparisonProducts.map((product, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <Image
                    alt={product.name}
                    className="h-40 w-full object-cover mb-4 rounded-md"
                    src={product.image}
                  />
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p>Price: ${product.price}</p>
                  <p>Category: {product.category}</p>
                  <p>Description: {product.description}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => setComparisonProducts([])}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Warning Modal */}
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 ${
          showWarning ? "block" : "hidden"
        }`}
        onClick={(e) => e.target === e.currentTarget && setShowWarning(false)}>
        <div className="bg-white rounded-lg p-6 w-1/3 text-center">
          <h3 className="text-lg font-semibold mb-4">Warning</h3>
          <p className="text-gray-600 mb-4">
            You can only compare up to 3 products of the same category.
          </p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={closeWarning}>
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

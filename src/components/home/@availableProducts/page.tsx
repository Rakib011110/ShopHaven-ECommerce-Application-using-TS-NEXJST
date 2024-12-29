"use client";
import "react-medium-image-zoom/dist/styles.css";
import { useState } from "react";

import { useGetAllProductsQuery } from "@/src/redux/api/productApi";
import Title from "@/src/lib/utils/Title";
import ProductCard from "@/src/pages/ProductsCard/ProductsCard";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const Products = () => {
  const { data, isLoading, error } = useGetAllProductsQuery({});

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="container mx-auto p-6 ">
      <Title bigTitle={"OUR PRODUCT"} smallTitle={"Choose your products"} />

      {/* Filters */}
      <div className="mb-4 grid max-w-screen-xl mx-auto sm:grid-cols-1 lg:grid-cols-5 gap-4">
        <input
          className="border px-4 py-2 rounded"
          placeholder="Search products..."
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <select
          className="border px-4 py-2 rounded"
          value={selectedCategory || ""}
          onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Outdoor Essentials">Outdoor Essentials</option>
          <option value="Tech & Gadgets">Tech & Gadgets</option>
          <option value="Fashion & Lifestyle">Fashion & Lifestyle</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
        </select>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border px-4 py-2 rounded"
            placeholder="Min Price"
            type="number"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, "min")}
          />
          <input
            className="border px-4 py-2 rounded"
            placeholder="Max Price"
            type="number"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, "max")}
          />
        </div>

        <select
          className="border px-4 py-2 rounded"
          onChange={handleSortChange}>
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <button
          className="border px-4 py-2 rounded bg-red-500 text-white"
          onClick={resetFilters}>
          Clear Filters
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product: Product) => (
          <ProductCard
            key={product.id}
            description={product.description}
            id={product.id}
            image={product.image}
            link={`/product/${product.id}`}
            name={product.name}
            price={product.price}
          />
        ))}
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
    </div>
  );
};

export default Products;

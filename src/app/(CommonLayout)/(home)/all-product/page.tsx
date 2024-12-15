"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/react";

import { useGetAllProductsQuery } from "@/src/redux/api/productApi";

const AllProducts: React.FC = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const { data, isLoading, error } = useGetAllProductsQuery({});
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (data && category) {
      const filtered = data.data.filter(
        (product: any) => product.category === category
      );

      setFilteredProducts(filtered);
    } else if (data) {
      setFilteredProducts(data.data);
    }
  }, [data, category]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products.</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4 text-center">
        {category ? `Products in ${category}` : "All Products"}
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product: any) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg">
            <Image
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
              src={product.image}
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 text-sm">{product.description}</p>
            <p className="text-green-600 font-bold">${product.price}</p>

            <Link
              className="flex justify-between"
              href={`/product/${product.id}`}>
              <Button>Vew details</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;

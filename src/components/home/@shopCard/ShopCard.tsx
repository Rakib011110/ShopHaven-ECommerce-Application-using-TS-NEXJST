"use client";

import React, { useState } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import {
  useAddItemToCartMutation,
  useGetCartItemsQuery,
} from "@/src/redux/api/cartApi";
import ProductCard from "@/src/pages/ProductsCard/ProductsCard";

const ShopCard = ({ shop, handleUnFollow, handleFollow }: any) => {
  console.log(shop);
  const [addToCart] = useAddItemToCartMutation();
  const { data: cart } = useGetCartItemsQuery({});
  const [showWarning, setShowWarning] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  const handleAddToCart = async (product: any) => {
    const productVendor = shop.id;
    const cartVendor = cart?.vendorId;

    if (cartVendor && cartVendor !== productVendor) {
      setPendingProduct(product);
      setShowWarning(true);
      return;
    }

    await addProductToCart(product);
  };

  const addProductToCart = async (product: any) => {
    try {
      const payload = { productId: product.id, quantity: 1 };

      await addToCart(payload).unwrap();
      alert("Product added to cart successfully!");
    } catch (error: any) {
      alert("Failed to add product to cart. Make sure you are a customer.");
    }
  };

  const replaceCartAndAdd = async () => {
    await addProductToCart(pendingProduct);
    setShowWarning(false);
  };

  // Filtered products based on search query and price filter
  const filteredProducts = shop.products?.filter((product: any) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "low" && product.price < 50) ||
      (priceFilter === "medium" &&
        product.price >= 50 &&
        product.price <= 100) ||
      (priceFilter === "high" && product.price > 100);

    return matchesSearch && matchesPrice;
  });

  return (
    <div>
      <div
        className="relative bg-cover bg-center p-6 rounded-lg shadow-lg"
        style={{
          backgroundImage: `url('https://file.forms.app/sitefile/Starting%20an%20online%20retail%20business%20with%20order%20forms%20cover-min.jpg')`,
        }}>
        <div className="flex flex-col md:flex-row bg-white bg-opacity-80 rounded-lg p-6 shadow-md">
          <div className="md:w-1/4 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-60 h-60 rounded-full overflow-hidden border border-gray-200 shadow-sm mb-4">
              <Image
                alt={`${shop.name} Logo`}
                className="w-full h-full object-cover"
                src={
                  shop.logo ||
                  "https://deshiz.com/wp-content/uploads/2020/02/Online-Shopping-Sites-In-Bangladesh.png"
                }
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{shop.name}</h2>
            <p className="text-gray-600 mt-2">
              {shop.description || "No description available"}
            </p>
            <p className="text-gray-600 mt-2">
              📞 {shop.contactNumber || "Not provided"}
            </p>
            <p className="text-gray-600 mt-2">
              Followers: {shop.followers?.length || 0}
            </p>
            <div className="mt-4 flex space-x-4">
              <Button color="primary" onClick={() => handleFollow(shop.id)}>
                Follow
              </Button>
              <Button color="danger" onClick={() => handleUnFollow(shop.id)}>
                Unfollow
              </Button>
            </div>

            <div className="mb-4 ">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded p-2 w-64 mt-5 mb-2  "
              />
              <br />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="border border-gray-300 rounded w-64 p-2">
                <option value="all">All Prices</option>
                <option value="low">Below $50</option>
                <option value="medium">$50 - $100</option>
                <option value="high">Above $100</option>
              </select>
            </div>
            <div>
              <Link
                className="text-blue-500 hover:underline mt-4"
                href={`/shop-details/${shop.id}`}>
                Visit shop
              </Link>
            </div>
          </div>

          <div className="md:w-2/3 mt-6 md:mt-0">
            {/* <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Products
            </h3> */}

            {filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product: any) => (
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
            ) : (
              <p className="text-sm text-gray-500">
                No products match your criteria.
              </p>
            )}
          </div>
        </div>
      </div>

      {showWarning && (
        <Modal isOpen onClose={() => setShowWarning(false)}>
          <ModalHeader>Warning</ModalHeader>
          <ModalBody>
            You can only add products from one vendor at a time. Do you want to:
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => setShowWarning(false)}>
              Cancel
            </Button>
            <Button color="warning" onClick={replaceCartAndAdd}>
              Replace Cart
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

export default ShopCard;

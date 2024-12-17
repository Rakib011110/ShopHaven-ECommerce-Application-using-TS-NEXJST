"use client";

import React, { useState } from "react";
import { useGetShopByIdQuery } from "@/src/redux/api/shopApi";
import {
  useAddItemToCartMutation,
  useGetCartItemsQuery,
} from "@/src/redux/api/cartApi";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

const ShopDetail = ({ shopid }: { shopid: any }) => {
  const { data: shopData, isLoading, error } = useGetShopByIdQuery(shopid);
  const [addToCart] = useAddItemToCartMutation();
  const { data: cart } = useGetCartItemsQuery({});
  const [showWarning, setShowWarning] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<any>(null);

  const handleAddToCart = async (product: any) => {
    const productVendor = shopData?.data?.id;
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
      //   console.error("Error adding to cart:", error?.data || error);
      alert("Failed to add product to cart.");
    }
  };

  const replaceCartAndAdd = async () => {
    await addProductToCart(pendingProduct);
    setShowWarning(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong. Please try again later.</p>;

  const shop = shopData?.data;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Shop Banner */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-6">
        <img
          src={shop.logo}
          alt={shop.name}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{shop.name}</h1>
          <p className="text-gray-600 mt-2">{shop.description}</p>
          <p className="text-gray-800 font-medium mt-2">
            Contact: {shop.contactNumber || "Not Provided"}
          </p>
          <p className="text-gray-800 font-medium mt-2">
            Address: {shop.address || "Not Provided"}
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shop.products.map((product: any) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-2">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-gray-800 font-bold">${product.price}</p>
                  <p className="text-green-600 font-medium">
                    {product.discount}% Off
                  </p>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  In Stock: {product.inventoryCount}
                </p>
                <Button
                  color="success"
                  className="mt-4"
                  onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning Modal */}
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

export default ShopDetail;

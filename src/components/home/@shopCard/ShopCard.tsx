"use client";

import React, { useState } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import {
  useAddItemToCartMutation,
  useGetCartItemsQuery,
} from "@/src/redux/api/cartApi";

const ShopCard = ({ shop, handleUnFollow, handleFollow }: any) => {
  const [addToCart] = useAddItemToCartMutation();
  const { data: cart } = useGetCartItemsQuery({});
  const [showWarning, setShowWarning] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<any>(null);

  const handleAddToCart = async (product: any) => {
    const productVendor = shop.id; // Vendor ID of the current shop
    const cartVendor = cart?.vendorId; // Vendor ID of items in the cart

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
      console.error("Error adding to cart:", error?.data || error);
      alert("Failed to add product to cart.");
    }
  };

  const replaceCartAndAdd = async () => {
    // Logic to clear and replace the cart
    await addProductToCart(pendingProduct);
    setShowWarning(false);
  };

  return (
    <div>
      <div key={shop.id} className="shadow-md bg-white rounded-lg">
        <Card isHoverable>
          <CardBody>
            <Image
              alt={`${shop.name} Logo`}
              className="rounded object-cover"
              height="150px"
              src={
                shop.logo ||
                "https://deshiz.com/wp-content/uploads/2020/02/Online-Shopping-Sites-In-Bangladesh.png"
              }
              width="100%"
            />
            <div className="mt-4">
              <p className="text-xl font-bold">{shop.name}</p>
              <h4 className="text-gray-500">
                {shop.description || "No description available"}
              </h4>
              <h4 className="text-gray-500 mt-2">
                📞 {shop.contactNumber || "Not provided"}
              </h4>
              <h4 className="text-gray-500 mt-2">
                Followers: {shop.followers?.length || 0}
              </h4>
            </div>
          </CardBody>

          <Divider />

          <CardFooter>
            <div className="flex items-center justify-between w-full">
              <Button color="primary" onClick={() => handleFollow(shop.id)}>
                Follow
              </Button>
              <Button color="danger" onClick={() => handleUnFollow(shop.id)}>
                Unfollow
              </Button>
            </div>
          </CardFooter>

          <Divider />

          <CardFooter>
            <p className="font-semibold">Products:</p>
            {shop.products && shop.products.length > 0 ? (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {shop.products.map((product: any) => (
                  <div
                    key={product.id}
                    className="shadow-md bg-white rounded-lg">
                    <Card isHoverable>
                      <CardBody>
                        <Image
                          alt={product.name}
                          className="rounded object-cover"
                          height="100px"
                          src={
                            product.image || "https://via.placeholder.com/150"
                          }
                          width="100%"
                        />
                        <p className="mt-2 font-bold">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          ${product.price.toFixed(2)} - {product.category}
                        </p>
                      </CardBody>
                      <CardFooter>
                        <Button
                          color="success"
                          onClick={() => handleAddToCart(product)}>
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No products available.</p>
            )}
          </CardFooter>
        </Card>
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

export default ShopCard;

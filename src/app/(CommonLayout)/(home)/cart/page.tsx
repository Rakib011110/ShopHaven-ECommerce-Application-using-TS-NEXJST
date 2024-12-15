"use client";

import React, { useState } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import {
  Button,
  Modal,
  Input,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import {
  useGetCartItemsQuery,
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "@/src/redux/api/cartApi";
import { useCreateOrderMutation } from "@/src/redux/api/orderApi";

const Cart = () => {
  const { data: cart, isLoading, isError } = useGetCartItemsQuery({});
  const {
    data: cartData,
    isLoading: CartLoading,
    isError: CartError,
  } = useGetCartQuery({});

  const [removeCartItem] = useRemoveCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [createOrder] = useCreateOrderMutation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const router = useRouter();

  if (isLoading) {
    return <div>Loading your cart...</div>;
  }

  if (isError || !cart || cart.data.length === 0) {
    return <div>Your cart is empty!</div>;
  }

  const calculateTotal = () => {
    return cart.data
      .reduce(
        (
          total: number,
          item: { product: { price: number }; quantity: number }
        ) => total + item.product.price * item.quantity,
        0
      )
      .toFixed(2);
  };

  const handleRemoveItem = async (id: string) => {
    try {
      await removeCartItem(id).unwrap();
      alert("Item removed from cart.");
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert("Failed to remove item from cart.");
    }
  };

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    try {
      await updateCartItem({ id, quantity: newQuantity }).unwrap();
      alert("Cart item updated.");
    } catch (error) {
      console.error("Failed to update quantity:", error);
      alert("Failed to update cart item.");
    }
  };

  const handleCheckout = async () => {
    try {
      const totalAmount = parseFloat(calculateTotal());
      const cartId = cartData?.data[0]?.id;

      if (!cartId) {
        throw new Error("Cart ID is missing.");
      }

      const response = await createOrder({
        cartId,
        totalAmount,
      }).unwrap();

      router.push(`/order/${response.data.id}`);
    } catch (error) {
      alert("Failed to place order.");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cart.data.map((item: any) => (
            <Card key={item.id} isHoverable className="shadow-md">
              <CardBody>
                <Image
                  alt={item.product.name}
                  className="rounded object-cover"
                  height="150px"
                  src={item.product.image || "https://via.placeholder.com/150"}
                  width="100%"
                />
                <div className="mt-4">
                  <p className="text-lg font-semibold">{item.product.name}</p>
                  <p className="text-gray-600 text-sm">
                    {item.product.description}
                  </p>
                  <p className="text-gray-800 font-bold mt-2">
                    ${item.product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-500 mr-2">
                      Quantity:
                    </span>
                    <input
                      className="w-16 px-2 py-1 border rounded text-center"
                      min="1"
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(item.id, Number(e.target.value))
                      }
                    />
                  </div>
                </div>
              </CardBody>
              <CardFooter className="flex justify-between items-center">
                <p className="font-semibold">
                  Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                </p>
                <Button
                  color="danger"
                  onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-bold">Cart Summary</h3>
          <p className="text-lg font-semibold mt-2">
            Total: ${calculateTotal()}
          </p>
          <Button
            className="mt-4"
            color="primary"
            size="lg"
            onClick={() => setModalOpen(true)}>
            Apply Coupon Code
          </Button>
          <Button
            className="mt-4"
            color="success"
            size="lg"
            onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalHeader>
          <h3 className="text-lg font-bold">Apply Coupon Code</h3>
        </ModalHeader>
        <ModalBody>
          <Input
            fullWidth
            placeholder="Enter coupon code"
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button
            color="success"
            onClick={() => {
              alert(`Coupon code ${couponCode} applied!`);
              setModalOpen(false);
            }}>
            Apply
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Cart;

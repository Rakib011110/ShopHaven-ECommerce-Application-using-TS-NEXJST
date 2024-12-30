"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetCartItemsQuery,
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "@/src/redux/api/cartApi";
import { useCreateOrderMutation } from "@/src/redux/api/orderApi";
import AddToCartCard from "@/src/components/UI/AddToCartCard/AddToCartCard";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";

const Cart = () => {
  const user = useUser();
  const { data: cart, isLoading, isError } = useGetCartItemsQuery({});
  const {
    data: cartData,
    isLoading: CartLoading,
    isError: CartError,
  } = useGetCartQuery({});
  const [removeCartItem] = useRemoveCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [createOrder] = useCreateOrderMutation();
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

  const handleApplyCoupon = () => {
    alert(`Coupon code "${couponCode}" applied!`);
  };

  return (
    <div className="container mx-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cart.data.map((item: any) => (
            <AddToCartCard
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveItem={handleRemoveItem}
              CartLoading={CartLoading}
              CartError={CartError}
              item={item}
              key={item.id}
            />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-bold mb-4">Cart Summary</h3>
          <div className="mb-4">
            <div className="flex justify-between items-center border-b pb-2">
              <p className="text-sm font-semibold">Subtotal:</p>
              <p className="text-sm font-bold">${calculateTotal()}</p>
            </div>
            <div className="flex justify-between items-center border-b pb-2 mt-2">
              <p className="text-sm font-semibold">Discount:</p>
              <p className="text-sm font-bold">-$0.00</p>
            </div>
            <div className="flex justify-between items-center border-b pb-2 mt-2">
              <p className="text-sm font-semibold">Tax (10%):</p>
              <p className="text-sm font-bold">
                ${(parseFloat(calculateTotal()) * 0.1).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center border-t pt-2 mt-2">
              <p className="text-lg font-bold">Total:</p>
              <p className="text-lg font-bold">
                ${(parseFloat(calculateTotal()) * 1.1).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Coupon Input */}
          <div className="mb-4">
            <label
              htmlFor="couponCode"
              className="block text-sm font-medium text-gray-700">
              Apply Coupon
            </label>
            <div className="flex mt-2">
              <input
                type="text"
                id="couponCode"
                className="w-full border rounded-l-md px-4 py-2 text-sm"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button
                size="sm"
                color="primary"
                className="rounded-r-md"
                onClick={handleApplyCoupon}>
                Apply
              </Button>
            </div>
          </div>

          {/* Checkout Buttons */}
          <div className="flex justify-between items-center mt-6">
            <Button
              className="border px-4 py-2 rounded font-semibold bg-[#04ecec] animate-bounce font-semibol  "
              color="warning"
              size="lg"
              onClick={() => router.push("/all-products")}>
              Continue Shopping
            </Button>
            <Button color="success" size="lg" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

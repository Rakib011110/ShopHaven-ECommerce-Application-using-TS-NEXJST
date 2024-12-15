"use client";

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCreatePaymentIntentMutation } from "@/src/redux/api/orderApi";

const PaymentForm = ({ orderId }: { orderId: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    if (!stripe || !elements) {
      toast.error("Stripe is not loaded yet.");
      return;
    }

    setIsProcessing(true);

    try {
      // Create a payment intent for the order
      const { data } = await createPaymentIntent(orderId).unwrap();

      if (!data.clientSecret) {
        throw new Error("Failed to retrieve client secret.");
      }

      // Confirm payment using the client secret
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement!,
          },
        }
      );

      if (error) {
        toast.error(`Payment failed: ${error.message}`);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        toast.success("Payment successful!");
        router.push("/success");
      }
    } catch (error: any) {
      toast.error(`Payment processing failed: ${error.message || error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
      <div className="p-4 border rounded-md">
        <CardElement className="p-2 border rounded-md" />
      </div>
      <Button
        className="mt-4"
        color="primary"
        isDisabled={isProcessing || !stripe || !elements}
        onClick={handlePayment}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </Button>
      {/* Add ToastContainer to display toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default PaymentForm;

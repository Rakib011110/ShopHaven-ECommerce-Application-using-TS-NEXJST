"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

import clientAxiosInstance from "@/src/lib/ClientAxiosInstance/ClientAxiosInstance";

// Load Stripe using the public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Elements stripe={stripePromise}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-6">Make a Payment</h1>
        <PaymentForm
          setErrorMessage={setErrorMessage}
          setLoading={setLoading}
          setPaymentSuccess={setPaymentSuccess}
        />
        {loading && <p>Processing payment...</p>}
        {paymentSuccess && (
          <p className="text-green-500">Payment successful!</p>
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </Elements>
  );
};

const PaymentForm = ({
  setLoading,
  setPaymentSuccess,
  setErrorMessage,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Function to handle payment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not yet loaded.
    }

    setLoading(true);
    setErrorMessage(null);

    // Fetch client secret from backend
    try {
      const { data } = await clientAxiosInstance.post(
        "/payment/create-payment-intent", // Updated endpoint
        {
          amount: 2000, // $20 in cents
        },
      );

      setClientSecret(data.data.clientSecret);
    } catch (error) {
      setErrorMessage("Failed to create payment intent");
      setLoading(false);

      return;
    }

    // Confirm the card payment
    if (clientSecret) {
      const cardElement = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement!,
          },
        },
      );

      if (error) {
        setErrorMessage(error.message || "Payment failed");
        setLoading(false);

        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);
      }

      setLoading(false);
    }
  };

  return (
    <form className="bg-white rounded-lg shadow-md p-8" onSubmit={handleSubmit}>
      <div className="mb-6">
        <CardElement className="border p-6 rounded-md text-lg w-96" />{" "}
        {/* Increased padding and font size */}
      </div>
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg" // Increased padding and font size
        disabled={!stripe}
        type="submit"
      >
        Pay $20
      </button>
    </form>
  );
};

export default PaymentPage;

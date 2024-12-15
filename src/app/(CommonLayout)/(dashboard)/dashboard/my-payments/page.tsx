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
  const [cardName, setCardName] = useState("");

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
        "/payment/create-payment-intent",
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

      if (!cardElement) {
        setErrorMessage("Card details are not filled");
        setLoading(false);

        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: cardName,
            },
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
    <form
      className="bg-gray-800 p-4 border border-white border-opacity-30 rounded-lg shadow-md max-w-xl mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-row items-center justify-between mb-3">
        <input
          className="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2 mb-3 flex-grow"
          id="cardName"
          name="cardName"
          placeholder="Full Name"
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <div className="flex items-center justify-center relative w-72 h-9 bg-gray-800 border border-white border-opacity-20 rounded-md">
          <svg
            className="text-white fill-current"
            height="30"
            viewBox="0 0 48 48"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
              fill="#ff9800"
            />
            <path
              d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
              fill="#d50000"
            />
            <path
              d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
              fill="#ff3d00"
            />
          </svg>
        </div>
      </div>
      <div className="mb-6">
        <CardElement className="border p-6 rounded-md text-lg w-full bg-gray-800 text-white" />{" "}
      </div>
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg mt-4"
        disabled={!stripe}
        type="submit"
      >
        Pay $20
      </button>
    </form>
  );
};

export default PaymentPage;

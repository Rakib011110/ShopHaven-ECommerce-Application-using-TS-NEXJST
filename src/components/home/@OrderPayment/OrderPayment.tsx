"use client";

import { useParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51M715KG0dHPWDu2BjZT7EDYWUpHPj7gkRIcSintHtzW3j0I76Ah2UXu389mPg556Q03IfZVjDTDvqnuJSq52cZ0P00YMiYiNfA"
);

const OrderPayment = () => {
  const params = useParams();
  const orderId = params?.orderId;

  //   console.log(orderId);

  if (!orderId) {
    return <div>Order ID is missing!</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm orderId={orderId} />
    </Elements>
  );
};

export default OrderPayment;

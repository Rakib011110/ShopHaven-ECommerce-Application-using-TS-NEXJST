"use client";
import OrderPayment from "@/src/components/home/@OrderPayment/OrderPayment";

const PaymentPage = ({ params }: { params: { orderId: string } }) => {
  return <OrderPayment />;
};

export default PaymentPage;

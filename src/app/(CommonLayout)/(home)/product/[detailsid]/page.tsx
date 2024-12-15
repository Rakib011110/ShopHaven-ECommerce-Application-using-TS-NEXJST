"use client";

import { useParams } from "next/navigation";
import ProductDetails from "../../ProductDetails/ProductDetails";
import { useUser } from "@/src/context/user.provider";

const ProductDetailsPage = () => {
  const { user } = useUser();
  const { detailsid } = useParams() as { detailsid: string };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-4">Product Details</h1>
      {detailsid && <ProductDetails productId={detailsid} />}
    </div>
  );
};

export default ProductDetailsPage;

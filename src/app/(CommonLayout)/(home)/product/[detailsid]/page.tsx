"use client";

import { useParams } from "next/navigation";
import ProductDetails from "../../ProductDetails/ProductDetails";

const ProductDetailsPage = () => {
  const { detailsid } = useParams() as { detailsid: string };

  return (
    <div className="max-w-7xl mx-auto">
      {detailsid && <ProductDetails productId={detailsid} />}
    </div>
  );
};

export default ProductDetailsPage;

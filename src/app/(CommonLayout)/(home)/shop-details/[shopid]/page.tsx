"use client";

import { useParams } from "next/navigation";
import ShopDetail from "../../ShopDetails/ShopDetail";

const ShopId = () => {
  const params = useParams();
  const shopid = params?.shopid;
  if (!shopid) {
    return <p>Error: Shop ID not found in URL.</p>;
  }

  return (
    <div className="container mx-auto">
      <ShopDetail shopid={shopid} />
    </div>
  );
};

export default ShopId;

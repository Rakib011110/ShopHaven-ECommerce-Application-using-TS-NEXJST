"use client";

import React from "react";

import { useGetAllShopsQuery } from "@/src/redux/api/shopApi";
import {
  useFollowShopMutation,
  useUnFollowShopMutation,
} from "@/src/redux/api/followApi";
import ShopCard from "@/src/components/home/@shopCard/ShopCard";
import ShopBanner from "@/src/components/UI/ShopBanner";

const Shop = () => {
  const { data: shopData, isLoading } = useGetAllShopsQuery(
    {},
    { pollingInterval: 1000 }
  );
  const [followShop] = useFollowShopMutation();
  const [unFollowShop] = useUnFollowShopMutation();
  const handleFollow = async (shopId: string) => {
    try {
      await followShop(shopId).unwrap();
      alert("Shop followed successfully!");
    } catch (error: any) {
      console.error("Error following shop:", error?.data || error);
      alert("Failed to follow shop.");
    }
  };

  const handleUnFollow = async (shopId: string) => {
    try {
      await unFollowShop(shopId).unwrap();
      alert("Shop unfollowed successfully!");
    } catch (error: any) {
      console.error("Error unfollowing shop:", error?.data || error);
      alert("Failed to unfollow shop.");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-lg text-blue-600">Loading shops...</div>
    );
  }

  if (!shopData?.data || shopData.data.length === 0) {
    return (
      <div className="text-center text-lg text-gray-500">
        No shops available.
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div>
        <ShopBanner />
      </div>

      <div className="mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-6">
          {shopData.data.map((shop: any) => (
            <ShopCard
              key={shop.id}
              handleFollow={handleFollow}
              handleUnFollow={handleUnFollow}
              shop={shop}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;

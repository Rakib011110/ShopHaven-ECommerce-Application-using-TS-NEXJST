"use client";
import React from "react";
import { Image } from "@nextui-org/image";

import {
  useGetAllShopsQuery,
  useBlacklistShopMutation,
  useDeleteShopMutation,
} from "@/src/redux/api/shopApi";

const ShopManage = () => {
  const { data: shops, isLoading } = useGetAllShopsQuery(
    {},
    { pollingInterval: 4000 }
  );
  const [blacklistShop] = useBlacklistShopMutation();
  const [deleteShop] = useDeleteShopMutation();

  const handleBlacklist = async (id: string) => {
    try {
      await blacklistShop(id).unwrap();
      alert("Shop blacklisted successfully");
    } catch (error) {
      console.error("Error blacklisting shop:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteShop(id).unwrap();
      alert("Shop deleted successfully");
    } catch (error) {
      console.error("Error deleting shop:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Manage Shops</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">LOGO</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Contact Number</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shops?.data?.map((shop: any) => (
            <tr key={shop.id} className="text-center">
              <td className="border  p-2">
                <Image className=" " src={shop.logo} width={100} />
              </td>
              <td className="border p-2">{shop.name}</td>
              <td className="border p-2">{shop.contactNumber}</td>
              <td className="border p-2">
                {/* <button
                  onClick={() => handleBlacklist(shop.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                  Blacklist
                </button> */}
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(shop.id)}>
                  Blacklist
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShopManage;

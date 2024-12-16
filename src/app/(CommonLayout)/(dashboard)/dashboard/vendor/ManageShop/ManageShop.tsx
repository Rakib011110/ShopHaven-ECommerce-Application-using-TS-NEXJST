/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Image } from "@nextui-org/image";

import {
  useGetVendorShopQuery,
  useUpdateShopMutation,
} from "@/src/redux/api/shopApi";

const ManageShop = () => {
  const { data: shopData, isLoading, error } = useGetVendorShopQuery({});
  const [updateShop, { isLoading: isUpdating }] = useUpdateShopMutation();
  const [postImages, setPostImages] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const methods = useForm();
  const { register, handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    if (shopData?.data) {
      const shop = shopData.data;

      setValue("name", shop.name);
      setValue("description", shop.description);
      setValue("contactNumber", shop.contactNumber);
      setValue("address", shop.address || "");
      setPostImages(shop.logo);
      setImagePreview(shop.logo);
    }
  }, [shopData, setValue]);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "techubimage");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dkm4xad0x/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await response.json();

      if (response.ok) {
        return data.secure_url;
      } else {
        toast.error(`Image upload failed: ${data.error?.message}`);

        return null;
      }
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      toast.error("Image upload failed.");

      return null;
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);

      const uploadedImage = await uploadToCloudinary(file);

      if (uploadedImage) {
        setPostImages(uploadedImage);
      }
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (!shopData?.data) {
      toast.error("Shop data not available.");

      return;
    }

    const updatedShopData = {
      id: shopData.data.id,
      name: data.name,
      logo: postImages || shopData.data.logo,
      description: data.description,
      contactNumber: data.contactNumber,
      address: data.address,
    };

    try {
      await updateShop(updatedShopData).unwrap();

      toast.success("Shop updated successfully!");
    } catch (error: any) {
      console.error("Failed to update shop:", error);
      toast.error(error?.data?.message || "Failed to update shop.");
    }
  };

  if (isLoading) {
    return <div>Loading shop data...</div>;
  }

  if (error || !shopData?.data) {
    return <div>Failed to load shop data.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Manage Your Shop</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Shop Name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="Enter shop name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Shop Description
          </label>
          <textarea
            {...register("description", { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="Enter shop description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Contact Number
          </label>
          <input
            type="text"
            {...register("contactNumber", { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="Enter contact number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            {...register("address")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="Enter shop address"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Shop Logo
          </label>
          <input
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            type="file"
            onChange={handleImageChange}
          />

          {imagePreview && (
            <div className="mt-4">
              <Image
                alt="Shop Logo Preview"
                className="w-full h-32 object-cover rounded-lg"
                src={imagePreview}
              />
            </div>
          )}
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          disabled={isUpdating}
          type="submit">
          {isUpdating ? "Updating Shop..." : "Update Shop"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default ManageShop;

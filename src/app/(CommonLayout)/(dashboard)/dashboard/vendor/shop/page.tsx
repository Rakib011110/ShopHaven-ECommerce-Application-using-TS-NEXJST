/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";

import { useUser } from "@/src/context/user.provider";
import {
  useCreateShopMutation,
  useGetVendorShopQuery,
} from "@/src/redux/api/shopApi";
import { Image } from "@nextui-org/image";
import ManageShop from "../ManageShop/ManageShop";
import { Link } from "@nextui-org/link";

export default function ShopSetting() {
  const { data: shopData, error } = useGetVendorShopQuery({});

  const [postImages, setPostImages] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { user } = useUser();
  const [createShop, { isLoading }] = useCreateShopMutation();

  const methods = useForm();
  const { register, handleSubmit, reset } = methods;

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
    const files = e.target.files;

    if (files) {
      const previews = Array.from(files).map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();

          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });
      });

      Promise.all(previews)
        .then(setImagePreviews)
        .catch((error) => {
          console.error("Error generating image preview:", error);
          toast.error("Error generating image preview.");
        });

      const uploadedImages = await Promise.all(
        Array.from(files).map((file) => uploadToCloudinary(file))
      );

      setPostImages(uploadedImages.filter((url) => url !== null) as string[]);
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (!user?.userId) {
      toast.error("You must be logged in as a vendor to create a shop.");

      return;
    }

    if (postImages.length === 0) {
      toast.error("Please upload a shop logo.");

      return;
    }

    const shopData = {
      name: data.name,
      logo: postImages[0],
      description: data.description,
      contactNumber: data.contactNumber,
      address: data.address,
    };

    try {
      await createShop(shopData).unwrap();
      toast.success("Shop created successfully!");
      reset();
      setPostImages([]);
      setImagePreviews([]);
    } catch (error: any) {
      console.error("Failed to create shop:", error);
      toast.error(error?.data?.message || "Failed to create shop.");
    }
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Create Your Shop</h1>

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
              {...register("address", { required: true })}
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

            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {imagePreviews.map((preview, index) => (
                  <Image
                    key={index}
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-cover rounded-lg"
                    src={preview}
                  />
                ))}
              </div>
            )}
          </div>

          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            disabled={isLoading}
            type="submit">
            {isLoading ? "Creating Shop..." : "Create Shop"}
          </button>
        </form>
      </div>

      <div>
        {/* <ManageShop /> */}

        <Link href={`${shopData?.data?.id}`}>GO FOR UPDATE</Link>
      </div>
    </div>
  );
}

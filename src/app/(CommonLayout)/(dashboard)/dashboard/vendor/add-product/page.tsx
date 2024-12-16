"use client";
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Image } from "@nextui-org/image";

import ProductManage from "../ProductManage/ProductManage";

import { useCreateProductMutation } from "@/src/redux/api/productApi";
import { useGetVendorShopQuery } from "@/src/redux/api/shopApi";

const AddNewProducts = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [productImages, setProductImages] = useState<string[]>([]);

  const { data: vendorShop } = useGetVendorShopQuery({});
  const shopId = vendorShop?.data?.id;

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "techubimage");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkm4xad0x/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        return data.secure_url;
      } else {
        toast.error(`Image upload failed: ${data.error?.message}`);

        return null;
      }
    } catch (error: any) {
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
          console.error("Error generating image previews:", error);
          toast.error("Error generating image previews.");
        });

      const uploadedImages = await Promise.all(
        Array.from(files).map((file) => uploadToCloudinary(file))
      );

      setProductImages(
        uploadedImages.filter((url) => url !== null) as string[]
      );
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (!shopId) {
      toast.error("You must have a shop to create a product.");

      return;
    }

    if (productImages.length === 0) {
      toast.error("Please upload at least one product image.");

      return;
    }

    const productData = {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category,
      inventoryCount: parseInt(data.inventoryCount, 10),
      discount: parseFloat(data.discount || 0),
      shopId,
      image: productImages[0],
    };

    try {
      await createProduct(productData).unwrap();
      toast.success("Product created successfully!");
      reset();
      setImagePreviews([]);
      setProductImages([]);
    } catch (error: any) {
      console.error("Failed to create product:", error);
      toast.error(error?.data?.message || "Failed to create product.");
    }
  };
  const getErrorMessage = (error: any): string => {
    return typeof error?.message === "string" ? error.message : "";
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Create a Product</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              type="text"
              {...register("name", { required: "Product name is required" })}
              fullWidth
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {typeof errors.name.message === "string"
                  ? errors.name.message
                  : ""}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              {...register("description", {
                required: "Description is required",
              })}
              fullWidth
              placeholder="Enter product description"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {getErrorMessage(errors.name)}
              </p>
            )}
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <Input
                type="number"
                {...register("price", { required: "Price is required" })}
                placeholder="Enter price"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Discount (%)
              </label>
              <Input
                type="number"
                {...register("discount")}
                placeholder="Enter discount"
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <Input
                type="text"
                {...register("category", { required: "Category is required" })}
                placeholder="Enter category"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Inventory Count
              </label>
              <Input
                type="number"
                {...register("inventoryCount", {
                  required: "Inventory count is required",
                })}
                placeholder="Enter inventory count"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <Input
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500"
              type="file"
              onChange={handleImageChange}
            />
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4">
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

          <Button
            className="w-full mt-4"
            color="primary"
            isDisabled={isLoading}
            type="submit">
            {isLoading ? "Creating Product..." : "Create Product"}
          </Button>
        </form>
        <ToastContainer />
      </div>
      <div>
        <ProductManage />
      </div>
    </div>
  );
};

export default AddNewProducts;

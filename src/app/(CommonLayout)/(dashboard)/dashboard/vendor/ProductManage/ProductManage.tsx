/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useGetVendorShopQuery } from "@/src/redux/api/shopApi";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/src/redux/api/productApi";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  inventoryCount: number;
  discount?: number;
  image?: string;
}

const ProductManage = () => {
  // Fetch shop data
  const { data: shopProducts } = useGetVendorShopQuery({});

  // Access products from the shop data
  const products = (shopProducts?.data?.products || []) as Product[];

  // States for managing modals and product edits
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [updatedProductData, setUpdatedProductData] = useState<
    Partial<Product>
  >({});

  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const handleDeleteProduct = async (productId: any) => {
    try {
      await deleteProduct(productId).unwrap();
      toast.success("Product deleted successfully!");
    } catch (error: any) {
      toast.error("Failed to delete product.");
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setUpdatedProductData(product);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedProduct) return;

    try {
      await updateProduct({
        id: selectedProduct.id,
        productData: updatedProductData,
      }).unwrap();
      toast.success("Product updated successfully!");
      setEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  const handleImageUpload = async (file: any) => {
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
        setUpdatedProductData((prev) => ({ ...prev, image: data.secure_url }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      toast.error("Image upload error.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md bg-white">
            <img
              alt={product.name}
              className="h-40 w-full object-cover rounded-md mb-4"
              src={product.image}
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-800 font-bold mt-2">
              ${product.price}
              {product.discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  {` $${(product.price / (1 - product.discount / 100)).toFixed(
                    2
                  )}`}
                </span>
              )}
            </p>
            <p className="text-sm text-gray-500">
              Inventory: {product.inventoryCount}
            </p>
            <div className="flex justify-between mt-4">
              <Button
                color="danger"
                onClick={() => handleDeleteProduct(product.id)}>
                Delete
              </Button>

              <Button
                color="primary"
                onClick={() => handleEditProduct(product)}>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                type="text"
                value={updatedProductData.name || ""}
                onChange={(e) =>
                  setUpdatedProductData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                value={updatedProductData.description || ""}
                onChange={(e) =>
                  setUpdatedProductData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                type="number"
                value={updatedProductData.price || ""}
                onChange={(e) =>
                  setUpdatedProductData((prev) => ({
                    ...prev,
                    price: parseFloat(e.target.value),
                  }))
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                type="file"
                onChange={(e: any) => handleImageUpload(e.target.files[0])}
              />
              {updatedProductData.image && (
                <img
                  alt="Preview"
                  className="mt-4 h-32 object-cover rounded-md"
                  src={updatedProductData.image}
                />
              )}
            </div>

            <div className="flex justify-end gap-4">
              <Button color="default" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button
                color="primary"
                isLoading={isUpdating}
                onClick={handleSaveEdit}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManage;

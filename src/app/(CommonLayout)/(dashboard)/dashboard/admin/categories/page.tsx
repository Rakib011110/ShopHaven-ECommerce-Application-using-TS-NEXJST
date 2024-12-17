"use client";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/src/redux/api/categoriesApit";
import React, { useState } from "react";

const CategoriesManager = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery({});
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = async () => {
    if (newCategoryName.trim()) {
      await addCategory({ name: newCategoryName });
      setNewCategoryName("");
    }
  };

  const handleUpdateCategory = async (id: string) => {
    const updatedName = prompt("Enter updated category name:");
    if (updatedName?.trim()) {
      await updateCategory({ id, updatedData: { name: updatedName } });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(id);
    }
  };

  if (isLoading) return <p className="text-gray-600">Loading categories...</p>;

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Categories Manager
      </h2>

      {/* Add Category */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="border rounded-md p-2 flex-grow"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse rounded-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left border">ID</th>
              <th className="p-3 text-left border">Name</th>
              <th className="p-3 text-center border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.data?.map((category: any, index: number) => (
              <tr
                key={category.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}>
                <td className="p-3 border text-gray-700">{category.id}</td>
                <td className="p-3 border text-gray-700">{category.name}</td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => handleUpdateCategory(category.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md mr-2 transition">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {categories?.data?.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesManager;

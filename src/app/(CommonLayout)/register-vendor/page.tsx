"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";

import { createVendor } from "@/src/services/createAcounts";

const VendorForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await createVendor({
        password: data.password,
        vendor: {
          email: data.email,
          contactNumber: data.contactNumber,
          profilePhoto: data.profilePhoto,
        },
      });

      toast.success("Vendor account created successfully!");
      reset();
      router.push("/login");
    } catch (error) {
      toast.error("Failed to create vendor account. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create Vendor Account
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            required
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            required
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="contactNumber">
            Contact Number
          </label>
          <input
            id="contactNumber"
            type="text"
            {...register("contactNumber")}
            required
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your contact number"
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit">
          Create Vendor
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Want to register as a customer?{" "}
          <Link
            className="text-blue-500 hover:underline"
            href="/register-customer">
            Create Customer Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VendorForm;

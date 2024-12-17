"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createCustomer } from "@/src/services/createAcounts";

const CustomerForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await createCustomer({
        password: data.password,
        customer: {
          email: data.email,
          name: data.name,
          contactNumber: data.contactNumber,
          profilePhoto: data.profilePhoto,
          address: data.address,
        },
      });

      // console.log("Customer Created:", response.data);
      toast.success("Customer created successfully!");
      reset();

      // Redirect to login page
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto   bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Create Customer Account
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            required
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

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

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="address">
            Address
          </label>
          <input
            id="address"
            type="text"
            {...register("address")}
            required
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your address"
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit">
          Create Customer
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Want to register as a vendor?{" "}
          <Link
            className="text-blue-500 hover:underline"
            href="/register-vendor">
            Create Vendor Account
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CustomerForm;

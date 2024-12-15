"use client";
import React from "react";
import { useForm } from "react-hook-form";

import { createVendor } from "@/src/services/createAcounts";

const VendorForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await createVendor({
        password: data.password,
        vendor: {
          email: data.email,
          contactNumber: data.contactNumber,
          profilePhoto: data.profilePhoto,
        },
      });

      console.log("Vendor Created:", response.data);
      reset();
    } catch (err) {
      console.error("Error creating vendor:", err);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input type="email" {...register("email")} required placeholder="Email" />
      <input
        type="password"
        {...register("password")}
        required
        placeholder="Password"
      />
      <input
        type="text"
        {...register("contactNumber")}
        required
        placeholder="Contact Number"
      />
      <input
        type="text"
        {...register("profilePhoto")}
        placeholder="Profile Photo URL"
      />
      <button type="submit">Create Vendor</button>
    </form>
  );
};

export default VendorForm;

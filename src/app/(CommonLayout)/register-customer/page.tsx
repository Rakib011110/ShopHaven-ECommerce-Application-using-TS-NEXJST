"use client";
import { useForm } from "react-hook-form";

import { createCustomer } from "@/src/services/createAcounts";

const CustomerForm = () => {
  const { register, handleSubmit, reset } = useForm();

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

      console.log("Customer Created:", response.data);
      reset();
    } catch (err) {
      console.error("Error creating customer:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto ">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} required placeholder="Name" />
        <input
          type="email"
          {...register("email")}
          required
          placeholder="Email"
        />
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
        <input
          type="text"
          {...register("address")}
          required
          placeholder="Address"
        />
        <button type="submit">Create Customer</button>
      </form>
    </div>
  );
};

export default CustomerForm;

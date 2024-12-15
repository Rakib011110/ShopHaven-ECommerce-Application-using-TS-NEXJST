import { createAdmin } from "@/src/services/createAcounts";
import React from "react";
import { useForm } from "react-hook-form";

const AdminForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await createAdmin({
        password: data.password,
        admin: {
          email: data.email,
          name: data.name,
          profilePhoto: data.profilePhoto,
        },
      });
      console.log("Admin Created:", response.data);
      reset();
    } catch (err) {
      console.error("Error creating admin:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="text" {...register("name")} placeholder="Name" required />
      <input type="email" {...register("email")} placeholder="Email" required />
      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        required
      />
      <input
        type="text"
        {...register("profilePhoto")}
        placeholder="Profile Photo URL"
      />
      <button type="submit">Create Admin</button>
    </form>
  );
};

export default AdminForm;

"use client";
import { useState, useEffect } from "react";

import { useUser } from "@/src/context/user.provider";
import { useUpdateCustomerMutation } from "@/src/redux/api/customerApi";

const Profile = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    address: "",
  });

  const [updateCustomer] = useUpdateCustomerMutation();
  const customerId = user?.associatedData?.customer?.id;

  useEffect(() => {
    if (user?.associatedData?.customer) {
      const customer = user.associatedData.customer;

      setFormData({
        name: customer.name || "",
        contactNumber: customer.contactNumber || "",
        address: customer.address || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (customerId) {
        await updateCustomer({
          id: customerId,
          customerData: formData,
        }).unwrap();
        alert("Profile updated successfully!");
      }
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium" htmlFor="name">
            Name:
          </label>
          <input
            className="p-2 border rounded w-full"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block font-medium" htmlFor="contactNumber">
            Contact Number:
          </label>
          <input
            className="p-2 border rounded w-full"
            id="contactNumber"
            name="contactNumber"
            type="text"
            value={formData.contactNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block font-medium" htmlFor="address">
            Address:
          </label>
          <input
            className="p-2 border rounded w-full"
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;

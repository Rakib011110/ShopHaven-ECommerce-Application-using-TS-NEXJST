"use client";

import { useUser } from "@/src/context/user.provider";
import React from "react";

const CustomerProfile = () => {
  const { user } = useUser();

  // Check if user data exists
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-medium text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  // Destructure user data
  const { email, role, status, needPasswordChange, associatedData } = user;
  const { customer } = associatedData || {};

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header Section */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full font-bold text-2xl uppercase">
          {customer?.name ? customer.name[0] : "U"}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            {customer?.name || "User Name"}
          </h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>

      {/* User Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium text-gray-600">Role</span>
          <span className="text-lg font-semibold text-gray-800">{role}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium text-gray-600">Status</span>
          <span className="text-lg font-semibold text-gray-800 capitalize">
            {status}
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium text-gray-600">
            Password Change Needed
          </span>
          <span className="text-lg font-semibold text-gray-800">
            {needPasswordChange ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium text-gray-600">Created At</span>
          <span className="text-lg font-semibold text-gray-800">
            {new Date(customer?.createdAt).toLocaleDateString() ||
              "Not Available"}
          </span>
        </div>
      </div>

      {/* Customer Details Section */}
      {customer && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Customer Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-600">
                Customer ID:
              </span>
              <span className="text-gray-800">{customer.id}</span>
            </div>
            {customer.contactNumber && (
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Contact Number:
                </span>
                <span className="text-gray-800">{customer.contactNumber}</span>
              </div>
            )}
            {customer.address && (
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Address:
                </span>
                <span className="text-gray-800">{customer.address}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-600">
                Profile Photo:
              </span>
              <span className="text-gray-800">
                {customer.profilePhoto ? (
                  <img
                    src={customer.profilePhoto}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  "Not Available"
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerProfile;

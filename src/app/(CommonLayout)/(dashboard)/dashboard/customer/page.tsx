"use client";

import { useUser } from "@/src/context/user.provider";
import React from "react";

const CustomerProfile = () => {
  const { user } = useUser();

  // Check if user data exists
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-700">
        Loading...
      </div>
    );
  }

  // Destructure user data
  const { email, role, status, needPasswordChange, associatedData } = user;

  const { customer, vendor, admin } = associatedData || {};

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        User Profile
      </h2>
      <div className="space-y-4 text-gray-600">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Email:</span>
          <span>{email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Role:</span>
          <span>{role}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Status:</span>
          <span>{status}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">
            {/* Password Change Needed: */}
          </span>
          {/* <span>{needPasswordChange ? "Yes" : "No"}</span> */}
        </div>

        {/* Display Associated Customer Details */}
        {customer && (
          <div className="mt-6 border-t pt-4 bg-gray-50 border-gray-200 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Customer Details:
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Customer ID:</span>
                <span className="text-gray-600">{customer.id}</span>
              </div>
              {customer.name && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="text-gray-600">{customer.name}</span>
                </div>
              )}
              {customer.contactNumber && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Contact Number:
                  </span>
                  <span className="text-gray-600">
                    {customer.contactNumber}
                  </span>
                </div>
              )}
              {customer.address && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Address:</span>
                  <span className="text-gray-600">{customer.address}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Display Vendor or Admin Details if available */}
        {vendor && (
          <div className="mt-6 border-t pt-4 bg-gray-50 border-gray-200 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Vendor Details:
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Vendor ID:</span>
                <span className="text-gray-600">{vendor.id}</span>
              </div>
            </div>
          </div>
        )}
        {admin && (
          <div className="mt-6 border-t pt-4 bg-gray-50 border-gray-200 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Admin Details:
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Admin ID:</span>
                <span className="text-gray-600">{admin.id}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;

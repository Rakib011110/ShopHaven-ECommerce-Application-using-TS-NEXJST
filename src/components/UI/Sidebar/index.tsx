"use client";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { Badge } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications

import Modal from "../updatemodal/Updatemodal";

import { adminLinks, userLinks } from "./constant";
import { SidebarOptions } from "./SidebarOptions/SidebarOptions";

import { useUser } from "@/src/context/user.provider";
import clientAxiosInstance from "@/src/lib/ClientAxiosInstance/ClientAxiosInstance";
import { getUser } from "@/src/services/getUser";

export interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  mobileNumber?: string;
  role: "USER" | "ADMIN";
  verified?: boolean;
  followers?: string[];
  following?: string[];
}

const Sidebar = () => {
  const { user, setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [users, setUsers] = useState<User>();

  // console.log("usersss", users);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (user?._id) {
        const data = await getUser(user._id);

        setUsers(data?.data || []); // Handle data from API response
      }
    };

    fetchUserPosts();
  }, [user]);

  // for updatate
  const handleUpdateProfile = async (formData: any) => {
    // console.log("Updating Profile with Data:", formData); // Debugging log
    try {
      const response = await clientAxiosInstance.patch(
        `/users/${user?._id}`,
        formData
      );

      if (response.status !== 200) {
        throw new Error("Error updating profile");
      }

      const updatedUser = response.data;

      // console.log("Updated User Data:", updatedUser);

      toast.success("Profile updated successfully!");
      setIsModalOpen(false);
    } catch (error: any) {
      // console.error("Failed to update profile:", error);
      toast.error(`Failed to update profile: ${error.message}`);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="rounded-xl bg-default-100 p-4 shadow-md">
        <div className="h-[330px] w-full rounded-md">
          <Image
            alt="profile"
            className="w-full h-full object-cover rounded-md"
            height={330}
            src={
              users?.profilePicture ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            width={330}
          />
        </div>
        <div className="my-3 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{users?.name}</h1>
            <p className="break-words text-sm text-gray-500">{user?.email}</p>
          </div>
          {!user?.verified && (
            <Badge className="ml-2" color="primary" size="sm" variant="flat">
              Verified
            </Badge>
          )}
        </div>
        <Button
          className="mt-4 w-full rounded-md bg-blue-600 text-white"
          onClick={() => setIsModalOpen(true)} // Open modal on click
        >
          UPDATE PROFILE
        </Button>
      </div>
      {/* Profile Update Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdateProfile}>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name">
            Name
          </label>
          <input
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            defaultValue={user?.name}
            id="name"
            name="name"
            type="text"
          />

          <label
            className="block text-sm font-medium text-gray-700 mt-4"
            htmlFor="email">
            Email
          </label>
          <input
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            defaultValue={user?.email}
            id="email"
            name="email"
            type="email"
          />

          <label
            className="block text-sm font-medium text-gray-700 mt-4"
            htmlFor="mobileNumber">
            Mobile Number
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            defaultValue={user?.mobileNumber}
            id="mobileNumber"
            name="mobileNumber"
            type="text"
          />

          <label
            className="block text-sm font-medium text-gray-700 mt-4"
            htmlFor="profilePicture">
            Profile Picture URL
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            defaultValue={user?.profilePicture}
            id="profilePicture"
            name="profilePicture"
            type="text"
          />

          <label
            className="block text-sm font-medium text-gray-700 mt-4"
            htmlFor="role">
            Role
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            defaultValue={user?.role}
            id="role"
            name="role">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </Modal>

      <div className="mt-6 space-y-2 rounded-xl bg-default-100 p-4">
        <SidebarOptions
          links={user?.role === "USER" ? userLinks : adminLinks}
        />
      </div>
      <div className="mt-6 flex justify-between">
        <div className="text-center">
          <h3 className="text-xl font-semibold">
            {users?.following?.length || 0}
          </h3>
          <p className="text-gray-500">Following</p>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold">
            {users?.followers?.length || 0}
          </h3>
          <p className="text-gray-500">Followers</p>
        </div>
      </div>

      {/* Sidebar Options: Links for user profile settings or admin panel */}
      <div className="mt-6 space-y-2 rounded-xl bg-default-100 p-4"></div>
      {/* Sidebar Options: Links for user profile settings or admin panel */}
    </div>
  );
};

export default Sidebar;

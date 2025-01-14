"use client";

import React from "react";
import { useUser } from "@/src/context/user.provider";
import { SidebarOptions } from "@/src/components/UI/Sidebar/SidebarOptions/SidebarOptions";
import {
  adminLinks,
  vendorLinks,
  customerLinks,
  dashboarduserLinks,
} from "@/src/components/UI/Sidebar/constant";
import { FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  const getSidebarLinks = () => {
    switch (user?.role) {
      case "ADMIN":
        return {
          title: "Admin Dashboard",
          links: adminLinks,
        };
      case "VENDOR":
        return {
          title: "Vendor Dashboard",
          links: vendorLinks,
        };
      case "CUSTOMER":
        return {
          title: "Customer Dashboard",
          links: customerLinks,
        };
      case "USER":
        return {
          title: "User Dashboard",
          links: dashboarduserLinks,
        };
      default:
        return null;
    }
  };

  const sidebarConfig = getSidebarLinks();

  return (
    <div className=" flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-4">
        {sidebarConfig ? (
          <>
            {/* Dashboard Title */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">{sidebarConfig.title}</h2>
              <FaBars className="text-white cursor-pointer md:hidden" />
            </div>

            {/* User Info */}
            <div className="flex items-center mb-6 space-x-3">
              <FaUserCircle size={40} className="text-white" />
              <div>
                <h3 className="text-lg font-bold">{user?.email || "User"}</h3>
                <span className="text-sm text-white capitalize">
                  {user?.role?.toLowerCase()}
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <SidebarOptions links={sidebarConfig.links} />

            {/* Logout Button */}
            <button
              className="mt-auto flex items-center space-x-2 text-red-400 hover:text-red-300 transition-all"
              onClick={() => console.log("Logout clicked")}>
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <div className="text-center text-red-500 font-bold">
            Access Denied
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white shadow-lg rounded-lg p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;

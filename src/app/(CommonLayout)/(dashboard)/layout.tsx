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

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  // Determine links based on user role
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        {sidebarConfig ? (
          <>
            <h2 className="text-2xl font-bold mb-6">{sidebarConfig.title}</h2>
            <SidebarOptions links={sidebarConfig.links} />
          </>
        ) : (
          <div className="text-center text-red-500 font-bold">
            Access Denied
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;

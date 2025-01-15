"use client";

import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getSidebarLinks = () => {
    switch (user?.role) {
      case "ADMIN":
        return {
          title: "Admin Dashboard 🛠️",
          links: adminLinks,
        };
      case "VENDOR":
        return {
          title: "Vendor Dashboard 🛒",
          links: vendorLinks,
        };
      case "CUSTOMER":
        return {
          title: "Customer Dashboard 🛍️",
          links: customerLinks,
        };
      case "USER":
        return {
          title: "User Dashboard 🌟",
          links: dashboarduserLinks,
        };
      default:
        return null;
    }
  };

  const sidebarConfig = getSidebarLinks();

  return (
    <div className="bg-[#25adc5] bg-opacity-30 min-h-screen">
      <div className="flex container mx-auto rounded-md min-h-screen ">
        {/* Sidebar */}
        <aside
          className={`${
            isCollapsed ? "w-4" : "w-72"
          } bg-blue-600 text-white flex flex-col p-4 transition-all duration-300`}>
          {/* Collapse Button */}
          <button
            className="text-white mb-4 self-end"
            onClick={() => setIsCollapsed(!isCollapsed)}>
            <FaBars />
          </button>

          {sidebarConfig ? (
            <>
              {/* Dashboard Title */}
              <div
                className={`flex items-center mb-8 ${
                  isCollapsed ? "justify-center" : "justify-between"
                }`}>
                {!isCollapsed && (
                  <h2 className="text-xl font-bold">{sidebarConfig.title}</h2>
                )}
              </div>

              {/* User Info */}
              <div
                className={`flex items-center mb-6 space-x-3 ${
                  isCollapsed ? "justify-center" : ""
                }`}>
                <FaUserCircle size={30} />
                {!isCollapsed && (
                  <div>
                    <h3 className="text-lg font-bold">
                      {user?.email || "User"}
                    </h3>
                    <span className="text-sm text-white capitalize">
                      {user?.role?.toLowerCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Navigation Links */}
              <div className={`${isCollapsed ? "text-center" : ""}`}>
                <SidebarOptions
                  links={sidebarConfig.links.map((link) => ({
                    ...link,
                    className: `flex items-center space-x-2 p-2 rounded-md hover:bg-blue-700 transition-colors ${
                      isCollapsed ? "justify-center" : ""
                    }`,
                  }))}
                />
              </div>

              {/* Logout Button */}
              <div className="group relative mt-auto">
                <button
                  className={`flex items-center space-x-2 text-red-400 hover:text-red-300 transition-all ${
                    isCollapsed ? "justify-center" : ""
                  }`}
                  onClick={() => console.log("Logout clicked")}>
                  <FaSignOutAlt />
                  {!isCollapsed && <span>Logout 🚪</span>}
                </button>
              </div>
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
    </div>
  );
};

export default DashboardLayout;

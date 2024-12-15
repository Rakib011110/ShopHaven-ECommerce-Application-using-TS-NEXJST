"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { usePathname, useRouter } from "next/navigation";

import { logout } from "@/src/services/AuthService";
import { useUser } from "@/src/context/user.provider";
import { protectedRoutes } from "@/src/constant";

const NavbarDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading: userLoading } = useUser();

  // Handle navigation to a specific path
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Handle user logout
  const handleLogout = () => {
    logout();
    userLoading(true);

    // Redirect to home if on a protected route
    if (pathname && protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Avatar className="cursor-pointer" src={user?.profilePicture} />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions">
          {/* Home Navigation */}
          <DropdownItem key="home" onClick={() => handleNavigation("/")}>
            Home
          </DropdownItem>

          {/* My Posts Navigation */}
          {/* <DropdownItem
            key="my-posts"
            onClick={() => handleNavigation("/my-posts")}
          >
            My Posts
          </DropdownItem> */}

          {/* Dashboard Navigation */}
          <DropdownItem
            key="dashboard"
            onClick={() => handleNavigation("/dashboard")}
          >
            Dashboard
          </DropdownItem>

          {/* Admin Dashboard Navigation */}
          {/* <DropdownItem
            key="admin-dashboard"
            onClick={() => handleNavigation("/admin-dashboard")}
          >
            Admin Dashboard
          </DropdownItem> */}

          {/* Profile Navigation */}
          <DropdownItem
            key="profile"
            onClick={() => handleNavigation("/profile")}
          >
            Profile
          </DropdownItem>

          {/* Create Post Navigation */}
          {/* <DropdownItem
            key="create-post"
            onClick={() => handleNavigation("/profile/create-post")}
          >
            Create Post
          </DropdownItem> */}

          {/* Settings Navigation */}
          <DropdownItem
            key="settings"
            onClick={() => handleNavigation("/profile/settings")}
          >
            Settings
          </DropdownItem>

          {/* Logout Option */}
          <DropdownItem
            key="logout"
            className="text-danger"
            color="danger"
            onClick={handleLogout}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NavbarDropdown;

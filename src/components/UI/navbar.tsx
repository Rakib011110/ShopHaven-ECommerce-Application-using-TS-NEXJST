/* eslint-disable react/no-unknown-property */
"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useState } from "react";

import { ThemeSwitch } from "./theme-switch";
import NavbarDropdown from "./NavbarDropdown/NavbarDropdown";
import SearchDropdown from "./SearchDropDown/SearchDropDown";

import { siteConfig } from "@/src/config/site";
import { Logo } from "@/src/components/icons";
import { useUser } from "@/src/context/user.provider";
import { useGetAllProductsQuery } from "@/src/redux/api/productApi";

export const Navbar = () => {
  const { user } = useUser();
  const { data } = useGetAllProductsQuery({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const products: any =
    data?.data.map((product: any) => ({
      id: product.id,
      category: product.category,
    })) || [];

  const uniqueCategories: string[] = Array.from(
    new Set(products.map((product: any) => product.category))
  );

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);
  const handleToggleClick = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div className="text-center sticky">
      <div>
        <NextUINavbar
          className="flex justify-between border-b border-[#20cefa] items-center max-w-screen-2xl mx-auto"
          maxWidth="2xl">
          <NavbarContent justify="start">
            <div className="flex items-center">
              <Logo />
            </div>
          </NavbarContent>
          <NavbarContent justify="center">
            <div className="w-full flex gap-3  max-w-md">
              <div>
                <NavbarContent
                  className="basis-1/5 sm:basis-full"
                  justify="start"
                />
              </div>

              <div>
                <SearchDropdown />
              </div>
            </div>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem className="hidden sm:flex gap-2 mr- border border-blue-600 p-1 rounded-full">
              <ThemeSwitch />
            </NavbarItem>
          </NavbarContent>
        </NextUINavbar>
      </div>

      <NextUINavbar
        className="bg-[#20cefa] bg-opacity-35"
        maxWidth="2xl"
        position="sticky">
        <NavbarContent>
          <NavbarBrand>
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              <button
                className="px-4 py-2 uppercase border-2   Border-[#00b9d1]  rounded-md"
                onClick={handleToggleClick}>
                Categories
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2  border shadow-md rounded-md w-48">
                  {uniqueCategories.map((category) => (
                    <div key={category} className="px-4 py-2  cursor-pointer">
                      <Link
                        className="text-blue-600"
                        href={`/all-product?category=${encodeURIComponent(category)}`}>
                        {category}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <ul className="hidden md:flex gap-4 justify-center md:justify-center text-center">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary text-center uppercase font-semibold"
                  )}
                  color="foreground"
                  href={item.href}>
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end">
          {user?.email ? (
            <NavbarItem className="hidden sm:flex gap-2">
              <NavbarDropdown />
            </NavbarItem>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </NavbarContent>
      </NextUINavbar>
    </div>
  );
};

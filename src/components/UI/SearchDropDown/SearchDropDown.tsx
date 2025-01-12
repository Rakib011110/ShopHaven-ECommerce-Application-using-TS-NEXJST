"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CardButton from "../CardButton/CardButton";

const SearchDropdown = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.push(`/all-product?category=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form className="max-w-xl mx-auto" onSubmit={handleSearch}>
      <div className="flex items-center space-x-2">
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            required
            className="block w-full px-4 py-2 border-[#0d048df1] border rounded-lg shadow-sm focus:ring-2 focus:ring-[#59d8ff] focus:outline-none focus:border-blue-500 text-sm"
            id="search-dropdown"
            placeholder="Search..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
          />
        </div>

        {/* Search Button */}
        <div className="hidden md:block">
          <CardButton text="Search" />
        </div>
      </div>
    </form>
  );
};

export default SearchDropdown;

"use client";

import CategoryFilter from "@/src/components/home/BlogComponent/CategoryFilter";
import BlogCard from "@/src/components/UI/BlogCard/BlogCard";
import { useState } from "react";

const fakeBlogs = [
  {
    id: 1,
    title: "Marketing Guide: 5 Steps to Success.",
    category: "Organic",
    date: "June 30, 2022",
    image: "https://grabit-next.tigerheck.com/assets/img/blog/1.jpg",
    description: "Marketing Guide: 5 Steps to Success to way.",
  },
  {
    id: 2,
    title: "Best way to solve business deal issue in market.",
    category: "Fruits",
    date: "April 02, 2022",
    image: "https://grabit-next.tigerheck.com/assets/img/blog/2.jpg",
    description: "Best way to solve business deal issue in market.",
  },
  {
    id: 3,
    title: "31 grocery customer service stats you need to know in 2019.",
    category: "Vegetables",
    date: "March 09, 2022",
    image: "https://grabit-next.tigerheck.com/assets/img/blog/3.jpg",
    description: "31 grocery customer service stats you need to know.",
  },
  {
    id: 4,
    title: "Business ideas to grow your business traffic.",
    category: "Fastfood",
    date: "January 25, 2022",
    image: "https://grabit-next.tigerheck.com/assets/img/blog/4.jpg",
    description: "Business ideas to grow your business traffic.",
  },
  {
    id: 5,
    title: "Marketing Guide: 5 Steps way to Success.",
    category: "Fruits",
    date: "December 10, 2021",
    image:
      "https://i.ytimg.com/vi/c7JhL2_qViw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB6gJozGnNQ0s5xU6pl0-MT0uOx7g",
    description: "Marketing Guide: 5 Steps way to Success.",
  },
];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 2;

  const filteredBlogs = fakeBlogs
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((blog) =>
      selectedCategory ? blog.category === selectedCategory : true
    );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page after search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search Our Blog"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Recent Articles</h2>
          <div className="space-y-4">
            {fakeBlogs.map((blog) => (
              <div key={blog.id} className="flex items-center space-x-4">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="text-sm font-medium">{blog.title}</p>
                  <p className="text-xs text-gray-500">{blog.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Category Filter */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </aside>

        {/* Blog Cards */}
        <main className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
            {currentBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === i + 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}>
                {i + 1}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlogPage;

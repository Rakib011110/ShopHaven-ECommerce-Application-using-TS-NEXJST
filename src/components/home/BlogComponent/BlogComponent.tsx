"use client";
import { Link } from "@nextui-org/react";
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
    image: "https://via.placeholder.com/300",
    description: "Marketing Guide: 5 Steps way to Success.",
  },
];

const BlogComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  const filteredBlogs = fakeBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
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
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Latest <span className="text-green-500">Blog</span>
          </h2>
          <p className="text-gray-500 text-sm">
            We tackle interesting topics every day in 2023.
          </p>
        </div>
        <div>
          <input
            className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search blogs..."
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Blog Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              alt={blog.title}
              className="w-full h-40 object-cover"
              src={blog.image}
            />
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-2">
                {blog.date} – {blog.category}
              </p>
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{blog.description}</p>
              <Link
                className="text-green-500 font-semibold hover:underline text-sm"
                href="#">
                Read More »
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-md ${
              currentPage === i + 1
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
            onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogComponent;

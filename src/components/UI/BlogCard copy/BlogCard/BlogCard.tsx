const BlogCard = ({ blog }: { blog: any }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-96 object-cover"
      />
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-2">
          {blog.date} – {blog.category}
        </p>
        <h3 className="font-bold text-lg text-gray-800 mb-2">{blog.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{blog.description}</p>
        {/* <a
          href="#"
          className="text-green-500 font-semibold hover:underline text-sm">
          Read More »
        </a> */}
      </div>
    </div>
  );
};

export default BlogCard;

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FaTrash } from "react-icons/fa";

import { useUser } from "@/src/context/user.provider";
import { getMyPost } from "@/src/services/mypost";
import { deletePost, useUpdatePost } from "@/src/services/allposts";
import TIInput from "@/src/components/resubaleform/TIInput";
import CreatePost from "@/src/components/home/@createposts/page";
import PostContent from "@/src/components/UI/postediteUi/PostContent";

// Define a Post type interface
interface Post {
  category: string;
  isPremium: any;
  createdAt: string | number | Date;
  _id: string;
  title: string;
  content: string;
  images?: string[] | null | undefined;
  upvotes: number;
  downvotes: number;
}

const MyPostsComponent = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editData, setEditData] = useState({ title: "", content: "" });
  const [postImages, setPostImages] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("newest");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const methods = useForm();

  const { handleSubmit } = methods;

  const { mutate: updatePostMutation } = useUpdatePost();

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (user?._id) {
        const data = await getMyPost(user._id);

        setPosts(data?.data || []); // Handle data from API response
      }
    };

    fetchUserPosts();
  }, [user]);

  // Handle edit button click
  const handleEditClick = (post: Post) => {
    setEditingPost(post);
    setEditData({ title: post.title, content: post.content });
    setShowModal(true);
  };

  const handleUpdatePost: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    if (!user || !editingPost) {
      toast.error("No user or post selected.");

      return;
    }

    // Create postData manually to avoid circular references
    const postData = {
      title: data.title, // Only the fields you need
      content: data.content,
      author: user._id,
    };

    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("author", postData.author);

    // Attach images if any
    if (postImages) {
      Array.from(postImages).forEach((file) => {
        formData.append("postImages", file);
      });
    }

    try {
      updatePostMutation(
        { postId: editingPost._id, formData },
        {
          onSuccess: () => {
            toast.success("Post updated successfully!");
            setImagePreviews([]);
            setPostImages(null);
            setShowModal(false); // Close modal on success
          },
          onError: () => {
            toast.success("Post update");
          },
        },
      );
    } catch (error) {
      toast.error("Error submitting form data.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setPostImages(files);

      const previews = Array.from(files).map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();

          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });
      });

      Promise.all(previews)
        .then(setImagePreviews)
        .catch((error) => {
          console.error("Error generating image preview:", error);
          toast.error("Error generating image preview.");
        });
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter
      ? post.category === categoryFilter
      : true;

    const matchesPremium = user?.premiumUser ? true : !post.isPremium;

    return matchesSearch && matchesCategory && matchesPremium;
  });

  const sortedPosts = filteredPosts.sort((a, b) => {
    switch (sortOption) {
      case "upvotes":
        return b.upvotes - a.upvotes;
      case "helpful":
        return b.downvotes - a.downvotes;
      case "newest":
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      toast.success("Post deleted successfully."); // Notify success
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error deleting post."); // Notify error
    }
  };

  return (
    <div className="py-8 px-6">
      <h1 className="text-3xl font-serif font-bold mb-5">
        {" "}
        WECLCOME TO PROFILE AND DASHBOARD
      </h1>

      <h1 className="text-1xl font-bold"> CREATE POST</h1>
      <div>
        <CreatePost />
      </div>

      <div>
        <div className="flex space-x-4 mb-6">
          <input
            className="p-2 border rounded w-full"
            placeholder="Search by keywords..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border rounded"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="CSS">CSS</option>
          </select>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${
              sortOption === "newest" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSortOption("newest")}
          >
            Newest
          </button>
          <button
            className={`px-4 py-2 rounded ${
              sortOption === "upvotes"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setSortOption("upvotes")}
          >
            Most Upvoted
          </button>
          <button
            className={`px-4 py-2 rounded ${
              sortOption === "helpful"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setSortOption("helpful")}
          >
            Most Helpful
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-semibold mb-6">My Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-col-1 gap-6">
          {sortedPosts.map((post: Post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-72 rounded-3xl">
                <Image
                  fill
                  alt=""
                  className="object-cover"
                  src={post.images?.[0] || "/default-post-image.jpg"}
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2 truncate">
                  <PostContent content={post.title} />
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {/* {post.content?.slice(0, 100)}... */}
                  <PostContent content={post.content} />
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <p>Upvotes: {post.upvotes || 0}</p>
                  <p>Downvotes: {post.downvotes || 0}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-100 flex justify-between items-center">
                <button
                  className="text-green-600 font-medium hover:underline"
                  onClick={() => handleEditClick(post)}
                >
                  Edit Post
                </button>
                <div>
                  <button
                    className="bg-red-500 text-white flex px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete(post._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Post Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handleUpdatePost)}>
                {/* Title Input */}
                <p className="block mb-2 text-sm font-medium">Title</p>
                <TIInput
                  required
                  name="title"
                  placeholder="Enter your post title"
                />

                {/* Content Input */}
                <p className="block mb-2 text-sm font-medium">Content</p>
                <TIInput
                  required
                  as="textarea"
                  name="content"
                  placeholder="Write your content here..."
                  rows={6}
                />

                {/* Image Upload */}
                <p className="block mb-2 text-sm font-medium">Upload Images</p>
                <input
                  multiple
                  accept="image/*"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  id="postImages"
                  type="file"
                  onChange={handleImageChange}
                />

                {/* Preview Existing or New Images */}
              </form>
            </FormProvider>

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleUpdatePost}
              >
                Update Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPostsComponent;

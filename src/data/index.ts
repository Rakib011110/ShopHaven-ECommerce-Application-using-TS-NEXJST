// export const posts = [];
// // CreatePost.tsx
// "use client";

// import { ChangeEvent, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";

// import { useUser } from "@/src/context/user.provider";
// import "react-toastify/dist/ReactToastify.css";
// import { useCreatePost } from "@/src/hooks/useCreatePost";

// import {
//   FieldValues,
//   FormProvider,
//   SubmitHandler,
//   useForm,
// } from "react-hook-form";

// import TIInput from "../../resubaleform/TIInput";

// export default function CreatePost() {
//   const [postImages, setPostImages] = useState<FileList | null>(null);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);

//   const { user } = useUser();
//   const { mutate: handleCreatePost } = useCreatePost();

//   const methods = useForm();
//   const { handleSubmit } = methods;

//   // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//   //   const files = e.target.files;

//   //   if (files) {
//   //     setPostImages(files);

//   //     const previews = Array.from(files).map((file) => {
//   //       const reader = new FileReader();

//   //       reader.readAsDataURL(file);

//   //       return new Promise<string>((resolve) => {
//   //         reader.onload = () => resolve(reader.result as string);
//   //       });
//   //     });

//   //     Promise.all(previews).then(setImagePreviews);
//   //   }
//   // };

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;

//     if (files) {
//       setPostImages(files);

//       const previews = Array.from(files).map((file) => {
//         return new Promise<string>((resolve, reject) => {
//           const reader = new FileReader();

//           reader.readAsDataURL(file);
//           reader.onload = () => resolve(reader.result as string);
//           reader.onerror = reject;
//         });
//       });

//       Promise.all(previews)
//         .then(setImagePreviews)
//         .catch((error) => {
//           console.error("Error generating image preview:", error);
//           toast.error("Error generating image preview.");
//         });
//     }
//   };

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     const formData = new FormData();
//     if (!user) {
//       toast.error("No user is logged in.");
//       return;
//     }

//     const postData = {
//       ...data,
//       author: user._id,
//     };
//     console.log("postData", postData);

//     formData.append("data", JSON.stringify(postData));

//     // Append images to formData
//     if (postImages) {
//       Array.from(postImages).forEach((file) => {
//         formData.append("postImages", file);
//       });
//     }

//     try {
//       handleCreatePost(formData, {
//         onSuccess: () => {
//           toast.success("Post created successfully!");
//           setImagePreviews([]);
//           setPostImages(null); // Reset the post images state
//           methods.reset({
//             title: "",
//             content: "",
//             category: "",
//             isPremium: false,
//             isPremiumContent: false,
//           });
//         },
//         onError: () => {
//           toast.error("Failed to create post.");
//         },
//       });
//     } catch (error) {
//       toast.error("Error submitting form data.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
//       <h3 className="text-2xl font-semibold mb-6 text-gray-800">
//         Create a New Post
//       </h3>

//       <FormProvider {...methods}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Post Title */}
//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium text-gray-700 mb-1"
//               htmlFor="title"
//             >
//               Post Title <span className="text-red-500">*</span>
//             </label>
//             <TIInput
//               required
//               name="title"
//               placeholder="Enter your post title"
//             />
//           </div>

//           {/* Post Content */}
//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium text-gray-700 mb-1"
//               htmlFor="content"
//             >
//               Post Content <span className="text-red-500">*</span>
//             </label>
//             <TIInput
//               required
//               as="textarea"
//               name="content"
//               placeholder="Write your content here..."
//               rows={6}
//             />
//           </div>

//           {/* Category */}
//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium text-gray-700 mb-1"
//               htmlFor="category"
//             >
//               Category (optional)
//             </label>
//             <TIInput
//               name="category"
//               placeholder="e.g., Web, Software Engineering, AI"
//             />
//           </div>

//           {/* Premium Post Checkbox */}
//           <div className="flex items-center mb-4">
//             <input
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               id="isPremium"
//               {...methods.register("isPremium")}
//               type="checkbox"
//             />
//             <label
//               className="ml-2 block text-sm text-gray-700"
//               htmlFor="isPremium"
//             >
//               Is this a Premium Post?
//             </label>
//           </div>

//           {/* Premium Content Checkbox */}
//           <div className="flex items-center mb-4">
//             <input
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               id="isPremiumContent"
//               {...methods.register("isPremiumContent")}
//               type="checkbox"
//             />
//             <label
//               className="ml-2 block text-sm text-gray-700"
//               htmlFor="isPremiumContent"
//             >
//               Is this Premium Content?
//             </label>
//           </div>

//           {/* Image Upload */}
//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium text-gray-700 mb-1"
//               htmlFor="postImages"
//             >
//               Upload Images:
//             </label>
//             <input
//               multiple
//               accept="image/*"
//               className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//               id="postImages"
//               type="file"
//               onChange={handleImageChange}
//             />
//           </div>

//           {/* Image Previews */}
//           {imagePreviews.length > 0 && (
//             <div className="mb-4">
//               <h4 className="text-lg font-medium text-gray-700 mb-2">
//                 Image Previews:
//               </h4>
//               <div className="flex flex-wrap gap-4">
//                 {imagePreviews.map((src, index) => (
//                   <div key={index} className="w-24 h-24 relative">
//                     <img
//                       alt={`Preview ${index + 1}`}
//                       className="object-cover w-full h-full rounded-md shadow-sm"
//                       src={src}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Submit Button */}
//           <div>
//             <button
//               className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               type="submit"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </FormProvider>

//       {/* Toast Container */}
//       <ToastContainer />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import { useUser } from "@/src/context/user.provider";
import "react-toastify/dist/ReactToastify.css";
import { useCreatePost } from "@/src/hooks/useCreatePost";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function CreatePost() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postImages, setPostImages] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { user } = useUser();

  console.log(user);
  const { mutate: handleCreatePost } = useCreatePost();

  const methods = useForm();
  const { handleSubmit } = methods;

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "techubimage");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dkm4xad0x/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await response.json();

      if (response.ok) {
        return data.secure_url;
      } else {
        toast.error(`Image upload failed: ${data.error?.message}`);

        return null;
      }
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      toast.error("Image upload failed.");

      return null;
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
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

      const uploadedImages = await Promise.all(
        Array.from(files).map((file) => uploadToCloudinary(file))
      );

      setPostImages(uploadedImages.filter((url) => url !== null) as string[]);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!user) {
      toast.error("No user is logged in.");

      return;
    }

    const postData = {
      ...data,
      images: postImages, // postImages are URLs already
      author: user._id,
    };

    try {
      handleCreatePost(postData, {
        onSuccess: () => {
          toast.success("Post created successfully!");
          setImagePreviews([]);
          setPostImages([]);
          methods.reset();
          setIsModalOpen(false);
        },
        onError: () => {
          toast.error("Failed to create post.");
        },
      });
    } catch (error) {
      toast.error("Error submitting form data.");
    }
  };

  return <div>HERE WASE POST APLOD</div>;
}

import clientAxiosInstance from "@/src/lib/ClientAxiosInstance/ClientAxiosInstance";

// export const createPost = async (formData: FormData): Promise<any> => {
//   try {
//     const { data } = await axiosInstance.post("/posts/create-post", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     revalidateTag("posts");

//     return data;
//   } catch (error) {
//     console.error("Error creating post:", error);
//     throw error; // <-- Ensure the error is propagated up
//   }
// };

export const createPost = async (postData: any): Promise<any> => {
  try {
    const { data } = await clientAxiosInstance.post(
      "/posts/create-post",
      postData, // Sending JSON data, not FormData
      {
        headers: {
          "Content-Type": "application/json", // Content-Type is JSON
        },
      },
    );

    // You can revalidate if needed
    // revalidateTag("posts");

    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const createPostComments = async (
  content: string,
  postid: string,
): Promise<any> => {
  try {
    const { data } = await clientAxiosInstance.post(
      `/posts/comments/${postid}`, // Using dynamic postid in the URL
      { content }, // Sending content in JSON format
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

// Example implementation in allposts.js
export const updateComment = async (commentId: string, updatedData: any) => {
  try {
    const response = await clientAxiosInstance.patch(
      `posts/comments/${commentId}`,
      updatedData,
    );
    return response.data; // Return the updated comment data
  } catch (error) {
    console.error("Error updating comment:", error);
    throw new Error("Failed to update comment");
  }
};

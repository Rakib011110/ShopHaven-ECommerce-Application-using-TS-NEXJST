import clientAxiosInstance from "@/src/lib/ClientAxiosInstance/ClientAxiosInstance";

// Follow a user
export const followUser = async (userId: string) => {
  try {
    const response = await clientAxiosInstance.post(`/users/follow/${userId}`);

    return response.data; // Return the updated user object or relevant data
  } catch (error) {
    console.error("Error following the user:", error);
    throw error;
  }
};

// Unfollow a user
export const unfollowUser = async (userId: string) => {
  try {
    const response = await clientAxiosInstance.post(
      `/users/unfollow/${userId}`,
    );

    return response.data; // Return the updated user object or relevant data
  } catch (error) {
    console.error("Error unfollowing the user:", error);
    throw error;
  }
};

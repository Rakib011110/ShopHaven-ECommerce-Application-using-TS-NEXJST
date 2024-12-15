import envConfig from "@/src/config/envConfig";

export const getMyPost = async (userid: string) => {
  if (!userid) {
    console.error("No user id found");

    return { data: [] };
  }

  const fetchOption = {
    next: {
      tags: ["posts"],
    },
  };

  try {
    const res = await fetch(
      `${envConfig.baseApi}/posts/user/${userid}`,
      fetchOption,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);

    return { data: [] }; // Return empty array in case of error
  }
};

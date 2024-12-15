import axios from "axios";

import envConfig from "@/src/config/envConfig";

export const getUser = async (userid: string) => {
  if (!userid) {
    console.error("No user id found");

    return { data: [] };
  }

  const fetchOption = {
    next: {
      tags: ["users"],
    },
  };

  try {
    const res = await fetch(
      `${envConfig.baseApi}/users/${userid}`,
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

// Fetch all users
export const getAllUsers = async () => {
  const fetchOption = {
    next: {
      tags: ["users"],
    },
  };

  try {
    const res = await fetch(`${envConfig.baseApi}/users`, fetchOption);

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching users:", error);

    return { data: [] }; // Return empty array in case of error
  }
};

export const gettingAllUsers = async () => {
  try {
    const res = await axios.get(`${envConfig.baseApi}/users`);

    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);

    return { data: [] }; // Return empty array in case of error
  }
};

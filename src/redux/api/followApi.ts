import Cookies from "js-cookie";

import baseApi from "../baseApi";

export const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Follow a shop
    followShop: builder.mutation({
      query: (id: string) => {
        const token = Cookies.get("accessToken");

        return {
          url: `/follow/${id}`,
          method: "POST",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["follow"],
    }),

    // Unfollow a shop
    unFollowShop: builder.mutation({
      query: (shopId: string) => {
        const token = Cookies.get("accessToken");

        return {
          url: `/follow/${shopId}`,
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["follow"],
    }),
  }),
});

export const { useFollowShopMutation, useUnFollowShopMutation } = followApi;

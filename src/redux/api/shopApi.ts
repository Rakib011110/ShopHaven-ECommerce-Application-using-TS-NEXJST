import Cookies from "js-cookie"; // Import Cookies

import baseApi from "../baseApi";

export const ShopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all shops
    getAllShops: builder.query({
      query: () => {
        return {
          url: "/shop",
          method: "GET",
        };
      },
      providesTags: ["Shop"], // For cache invalidation
    }),

    // Fetch a shop by ID
    getShopById: builder.query({
      query: (id: string) => {
        const token = Cookies.get("accessToken");

        return {
          url: `/shop/${id}`,
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      providesTags: (result, error, id) => [{ type: "Shop", id }],
    }),

    getVendorShop: builder.query({
      query: () => {
        const token = Cookies.get("accessToken");

        return {
          url: "/shop/vendor",
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      providesTags: ["Shop"],
    }),

    // Create a new shop
    createShop: builder.mutation({
      query: (shopData) => {
        const token = Cookies.get("accessToken");

        return {
          url: "/shop",
          method: "POST",
          body: shopData,
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["Shop"], // Invalidate all shop queries
    }),

    // Update an existing shop
    updateShop: builder.mutation({
      query: (updatedData) => {
        const token = Cookies.get("accessToken");

        return {
          url: `/shop`,
          method: "PUT",
          body: updatedData,
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["Shop"],
    }),

    // Soft delete a shop
    deleteShop: builder.mutation({
      query: (id: string) => {
        const token = Cookies.get("accessToken");

        return {
          url: `/shop/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["Shop"], // Invalidate all shop queries
    }),
  }),
});

export const {
  useGetAllShopsQuery,
  useGetShopByIdQuery,
  useCreateShopMutation,
  useUpdateShopMutation,
  useDeleteShopMutation,
  useGetVendorShopQuery,
} = ShopApi;

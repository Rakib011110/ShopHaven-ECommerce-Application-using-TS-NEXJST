import Cookies from "js-cookie"; // Import Cookies

import baseApi from "../baseApi";

export const ShopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllShops: builder.query({
      query: () => {
        return {
          url: "/shop",
          method: "GET",
        };
      },
      providesTags: ["Shop"],
    }),

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

    // getAllShops: builder.query({
    //   query: () => {
    //     return { url: "/shop", method: "GET" };
    //   },
    //   providesTags: ["Shop"],
    // }),

    blacklistShop: builder.mutation({
      query: (id: string) => {
        const token = Cookies.get("accessToken");

        return {
          url: `/shop/${id}/blacklist`, // Assume backend has /shop/:id/blacklist endpoint
          method: "PATCH",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["Shop"],
    }),

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
      invalidatesTags: ["Shop"],
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
  useBlacklistShopMutation,
} = ShopApi;

// // shopApi.ts
// import Cookies from "js-cookie";
// import baseApi from "../baseApi";

// export const ShopApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({

//   }),
// });

// export const {
//   useGetAllShopsQuery,
//   useBlacklistShopMutation,
//   useDeleteShopMutation,
// } = ShopApi;

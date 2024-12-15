import Cookies from "js-cookie";

import baseApi from "../baseApi";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addItemToCart: builder.mutation({
      query: ({ productId, quantity }) => {
        const token = Cookies.get("accessToken");

        return {
          url: `/cart/items`,
          method: "POST",
          headers: {
            Authorization: `${token}`,
          },
          body: { productId, quantity },
        };
      },
      invalidatesTags: ["Cart"],
    }),

    // Get all cart items
    getCartItems: builder.query({
      query: () => {
        const token = Cookies.get("accessToken");

        return {
          url: `/cart/items`,
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      providesTags: ["Cart"],
    }),

    getCart: builder.query({
      query: () => {
        const token = Cookies.get("accessToken");

        return {
          url: `/cart`,
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      providesTags: ["Cart"],
    }),

    // Update cart item
    updateCartItem: builder.mutation({
      query: ({ id, quantity }) => {
        const token = Cookies.get("accessToken");

        return {
          url: `/cart/items/${id}`,
          method: "PUT",
          headers: {
            Authorization: `${token}`,
          },
          body: { quantity },
        };
      },
      invalidatesTags: ["Cart"],
    }),

    // Remove cart item
    removeCartItem: builder.mutation({
      query: (id) => {
        const token = Cookies.get("accessToken");

        return {
          url: `/cart/items/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddItemToCartMutation,
  useGetCartQuery,
  useGetCartItemsQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} = cartApi;

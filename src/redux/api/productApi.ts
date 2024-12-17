import Cookies from "js-cookie";

import baseApi from "../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => ({
        url: "/product",
        params: args,
      }),
      providesTags: ["Products"],
    }),

    // Fetch a product by ID
    getProductById: builder.query({
      query: (id) => `/product/${id}`,
    }),

    // Create a new product
    createProduct: builder.mutation({
      query: (productData) => {
        const token = Cookies.get("accessToken");

        return {
          url: "/product",
          method: "POST",
          body: productData,
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, productData }) => {
        const token = Cookies.get("accessToken");

        return {
          url: `/product/${id}`,
          method: "PUT",
          body: productData,
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["Products"],
    }),

    // Soft delete a product
    deleteProduct: builder.mutation({
      query: (id) => {
        const token = Cookies.get("accessToken");

        return {
          url: `/product/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;

export default productApi;

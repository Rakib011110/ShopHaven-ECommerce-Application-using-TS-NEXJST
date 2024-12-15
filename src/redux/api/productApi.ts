import baseApi from "../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all products
    getAllProducts: builder.query({
      query: (args) => ({
        url: "/product",
        params: args, // Pass optional filters or pagination arguments
      }),
    }),

    // Fetch a product by ID
    getProductById: builder.query({
      query: (id) => `/product/${id}`,
    }),

    // Create a new product
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/product",
        method: "POST",
        body: productData,
      }),
    }),

    // Update an existing product
    updateProduct: builder.mutation({
      query: ({ id, productData }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: productData,
      }),
    }),

    // Soft delete a product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
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

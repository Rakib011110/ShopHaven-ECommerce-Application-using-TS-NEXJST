import baseApi from "../baseApi";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllVendorShops: builder.query({
    //   query: () => "/shop",
    //   providesTags: ["VendorShop"],
    // }),
    deleteVendorShop: builder.mutation({
      query: (id: string) => ({
        url: `/shop/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["VendorShop"],
    }),
  }),
});

export const { useDeleteVendorShopMutation } = vendorApi;
export default vendorApi;

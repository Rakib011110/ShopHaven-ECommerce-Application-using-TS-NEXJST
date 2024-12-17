import baseApi from "../baseApi";
import Cookies from "js-cookie";

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllcustomer: builder.query({
      query: () => ({
        url: "/customer",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      }),
    }),
    getCustomerById: builder.query({
      query: (id: string) => ({
        url: `/customer/${id}`,
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      }),
    }),
    createCustomer: builder.mutation({
      query: (customerData) => ({
        url: "/customer",
        method: "POST",
        body: customerData,
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      }),
    }),
    updateCustomer: builder.mutation({
      query: ({ id, customerData }) => ({
        url: `/customer/${id}`,
        method: "PUT",
        body: customerData,
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      }),
    }),
    softDeleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customer/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllcustomerQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useSoftDeleteCustomerMutation,
} = customerApi;

export default customerApi;

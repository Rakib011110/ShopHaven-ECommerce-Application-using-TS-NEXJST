import Cookies from "js-cookie";

import baseApi from "../baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order",
        method: "POST",
        body: orderData,
        headers: {
          Authorization: `${Cookies.get("accessToken")}`, // Add token to headers
        },
      }),
      invalidatesTags: ["Cart"], // Invalidate cart after order creation
    }),

    // Create a Stripe payment intent
    createPaymentIntent: builder.mutation({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "POST",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`, // Add token to headers
        },
      }),
    }),

    // Update order status (e.g., Completed, Canceled)
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/order/${orderId}`,
        method: "PUT",
        body: { status },
        headers: {
          Authorization: `${Cookies.get("accessToken")}`, // Add token to headers
        },
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Order", id: orderId },
      ],
    }),

    // Get order details by ID
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`, // Add token to headers
        },
      }),
      providesTags: (result, error, orderId) => [
        { type: "Order", id: orderId },
      ],
    }),

    // Get paginated order history
    getOrderHistory: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/order/history`,
        method: "GET",
        params: { page, limit },
        headers: {
          Authorization: `${Cookies.get("accessToken")}`, // Add token to headers
        },
      }),
      providesTags: ["Order"],
    }),

    // Get all orders (NEW)
    getAllOrders: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/order`,
        method: "GET",
        params: { page, limit },
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
  useUpdateOrderStatusMutation,
  useGetOrderDetailsQuery,
  useGetOrderHistoryQuery,
  useGetAllOrdersQuery,
} = orderApi;

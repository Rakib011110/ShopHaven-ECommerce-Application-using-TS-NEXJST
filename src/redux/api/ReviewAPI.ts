"use client";
import Cookies from "js-cookie";

import baseApi from "../baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a review
    createReview: builder.mutation({
      query: (reviewData) => {
        const token = Cookies.get("accessToken");

        return {
          url: "/review",
          method: "POST",
          body: reviewData,
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["Review"],
    }),

    // Get a specific review by ID
    getReview: builder.query({
      query: (id) => {
        const token = Cookies.get("accessToken");

        return {
          url: `/review/${id}`,
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      providesTags: (result, error, id) => [{ type: "Review", id }],
    }),

    // Update a review
    updateReview: builder.mutation({
      query: ({ id, ...updateData }) => {
        const token = Cookies.get("accessToken");

        return {
          url: `/review/reply/${id}`,
          method: "PUT",
          body: updateData,
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Review", id }],
    }),

    // Delete a review
    deleteReview: builder.mutation({
      query: (id) => {
        const token = Cookies.get("accessToken");

        return {
          url: `/review/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Review", id }],
    }),

    // Add vendor reply to a review
    addVendorReply: builder.mutation({
      query: ({ id, reply }) => {
        const token = Cookies.get("accessToken");

        return {
          url: `/review/reply/${id}`,
          method: "PUT",
          body: { vendorReply: reply },
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Review", id }],
    }),

    // Get all reviews for a vendor's customers
    getAllCustomerReviews: builder.query({
      query: () => {
        const token = Cookies.get("accessToken");

        return {
          url: "/review",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      providesTags: ["Review"],
    }),

    // Get all reviews for a specific vendor
    getVendorReviews: builder.query({
      query: () => {
        const token = Cookies.get("accessToken");

        return {
          url: "/review/vendor",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      providesTags: ["Review"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateReviewMutation,
  useGetReviewQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useAddVendorReplyMutation,
  useGetAllCustomerReviewsQuery,
  useGetVendorReviewsQuery,
} = reviewApi;

export default reviewApi;

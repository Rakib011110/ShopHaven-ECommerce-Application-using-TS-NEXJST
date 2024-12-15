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

    // Get reviews by product ID
    getReview: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: (result, error, id) => [{ type: "Review", id }],
    }),

    // Update a review
    updateReview: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/reviews/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Review", id }],
    }),

    // Delete a review
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Review", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateReviewMutation,
  useGetReviewQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;

export default reviewApi;

"use client";
import Cookies from "js-cookie";

import baseApi from "../baseApi";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }),
      providesTags: ["Category"],
    }),

    addCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/categories",
        method: "POST",
        body: categoryData,
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: updatedData,
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;

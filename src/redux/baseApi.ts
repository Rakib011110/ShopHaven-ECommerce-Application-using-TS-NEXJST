// src/redux/services/baseApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commerce-application-backend-puce.vercel.app/api/v1",
  }),
  tagTypes: ["User", "Cart", "follow", "Shop", "Order", "Review"], // Define tags for caching and invalidation
  endpoints: () => ({}), // Extend later with endpoints
});

export default baseApi;

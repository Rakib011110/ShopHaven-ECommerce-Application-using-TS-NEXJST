// src/redux/services/baseApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1", // Set your API base URL
  }),
  tagTypes: ["User", "Cart", "follow", "Shop", "Order", "Review"], // Define tags for caching and invalidation
  endpoints: () => ({}), // Extend later with endpoints
});

export default baseApi;

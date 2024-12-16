// src/redux/services/baseApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    // baseUrl: "https://e-commerce-application-backend-puce.vercel.app/api/v1",
  }),
  tagTypes: ["User", "Cart", "follow", "Shop", "Order", "Review"],
  endpoints: () => ({}),
});

export default baseApi;

// src/redux/store/store.ts

import { configureStore } from "@reduxjs/toolkit";

import baseApi from "../baseApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer, // Add the baseApi reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware), // Add middleware for RTK Query
  });
};

// Infer the store types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { volumes } from "./endpoints/volumes";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/books/v1/",
  }),
  endpoints: (builder) => ({
    getBookListBySearch: volumes(builder),
  }),
});

export const { useGetBookListBySearchQuery, useLazyGetBookListBySearchQuery } =
  bookApi;

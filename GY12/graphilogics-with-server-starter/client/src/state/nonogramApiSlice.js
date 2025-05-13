import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

export const nonogramApi = createApi({
  reducerPath: "puzzleApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getAllPuzzles: build.query({
      query: () => "puzzles",
      transformResponse: (response) => response.data,
    }),
    getPuzzleById: build.query({
      query: (id) => `puzzle/${id}`,
    }),
  }),
});

export const { useGetAllPuzzlesQuery, useGetPuzzleByIdQuery } = nonogramApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

export const puzzlesApi = createApi({
  reducerPath: "puzzlesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Puzzles"],
  endpoints: (build) => ({
    getPuzzles: build.query({
      query: () => "puzzles",
      transformResponse: (res) => res.data,
      providesTags: ["Puzzles"],
    }),
    addPuzzle: build.mutation({
      query: ({ title, puzzle }) => ({
        url: "puzzles",
        method: "POST",
        body: {
          title,
          puzzle,
        },
      }),
      invalidatesTags: ["Puzzles"],
    }),
    login: build.mutation({
      query: ({ username: email, password }) => ({
        url: "authentication",
        method: "POST",
        body: {
          strategy: "local",
          email,
          password,
        },
      }),
    }),
  }),
});

// hooks
export const { useGetPuzzlesQuery, useLoginMutation, useAddPuzzleMutation } = puzzlesApi;

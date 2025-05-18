import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Students"],
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ email, password }) => ({
        url: "auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    }),
    getStudents: build.query({
      query: () => `students`,
      providesTags: ["Students"],
    }),
    getStudent: build.query({
      query: (id) => `student/${id}`,
      providesTags: ["Students"],
    }),
    getStudentLessons: build.query({
      query: (id) => `student/${id}/lessons`,
      providesTags: ["Students"],
    }),
    deleteStudent: build.mutation({
      query: (id) => ({
        url: `student/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

// hooks
export const {
  useLoginMutation,
  useGetStudentsQuery,
  useGetStudentQuery,
  useGetStudentLessonsQuery,
  useDeleteStudentMutation,
} = apiSlice;

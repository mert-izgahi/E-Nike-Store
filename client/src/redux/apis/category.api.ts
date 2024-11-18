import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategory } from "@/lib/types";
import { CategorySchema } from "@/lib/zod";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/categories",
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<{ data: ICategory[] }, void>({
      query: () => "/",
      transformResponse: (response: any) => response?.data,
      providesTags: ["Category"],
    }),

    getParentCategories: builder.query<{ data: ICategory[] }, void>({
      query: () => "/parents",
      transformResponse: (response: any) => response?.data,
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation<any, { args: CategorySchema }>({
      query: ({ args }) => ({
        url: "/",
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation<any, {categoryId: string, args: CategorySchema }>({
      query: ({categoryId, args }) => ({
        url: `/${categoryId}`,
        method: "PUT",
        body: args,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation<any, { categoryId: string }>({
      query: ({ categoryId }) => ({
        url: `/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetParentCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

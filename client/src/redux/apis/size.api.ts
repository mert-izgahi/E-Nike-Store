import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SizeSchema } from "@/lib/zod";
import { ISize } from "@/lib/types";

export const sizeApi = createApi({
  reducerPath: "sizeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/sizes",
  }),
  tagTypes: ["Size"],
  endpoints: (builder) => ({
    getSizes: builder.query<ISize[], void>({
      query: () => "/",
      providesTags: ["Size"],
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),
    getSize: builder.query<ISize, { sizeId: string }>({
      query: ({ sizeId }) => `/${sizeId}`,
      providesTags: ["Size"],
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

    createSize: builder.mutation<ISize, { args: SizeSchema }>({
      query: ({ args }) => ({
        url: "/",
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["Size"],
      transformErrorResponse: (response: any) => response?.data,
    }),
    updateSize: builder.mutation<ISize, { sizeId: string; args: SizeSchema }>({
      query: ({ sizeId, args }) => ({
        url: `/${sizeId}`,
        method: "PUT",
        body: args,
      }),
      invalidatesTags: ["Size"],
      transformErrorResponse: (response: any) => response?.data,
    }),
    deleteSize: builder.mutation<ISize, { sizeId: string }>({
      query: ({ sizeId }) => ({
        url: `/${sizeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Size"],
      transformErrorResponse: (response: any) => response?.data,
    }),
  }),
});

export const {
  useGetSizesQuery,
  useGetSizeQuery,
  useCreateSizeMutation,
  useUpdateSizeMutation,
  useDeleteSizeMutation,
} = sizeApi;

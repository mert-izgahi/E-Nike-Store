import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IVariant } from "@/lib/types";
import { VariantSchema } from "@/lib/zod";

export const variantApi = createApi({
  reducerPath: "variantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/variants",
  }),
  tagTypes: ["Variant"],
  endpoints: (builder) => ({
    getVariants: builder.query<IVariant[], void>({
      query: () => "/",
      providesTags: ["Variant"],
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),
    getVariant: builder.query<IVariant, { variantId: string }>({
      query: ({ variantId }) => `/${variantId}`,
      providesTags: ["Variant"],
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),
    createVariant: builder.mutation<IVariant, { args: VariantSchema }>({
      query: ({ args }) => ({
        url: "/",
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["Variant"],
      transformErrorResponse: (response: any) => response?.data,
    }),
    updateVariant: builder.mutation<
      IVariant,
      { variantId: string; args: VariantSchema }
    >({
      query: ({ variantId, args }) => ({
        url: `/${variantId}`,
        method: "PUT",
        body: args,
      }),
      invalidatesTags: ["Variant"],
      transformErrorResponse: (response: any) => response?.data,
    }),
    deleteVariant: builder.mutation<IVariant, { variantId: string }>({
      query: ({ variantId }) => ({
        url: `/${variantId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Variant"],
      transformErrorResponse: (response: any) => response?.data,
    }),
  }),
});

export const {
  useGetVariantsQuery,
  useGetVariantQuery,
  useCreateVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
} = variantApi;

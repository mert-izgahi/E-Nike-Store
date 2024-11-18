import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CollectionSchema } from "@/lib/zod";
import { ICollection } from "@/lib/types";

export const collectionApi = createApi({
  reducerPath: "collectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/collections",
  }),
  tagTypes: ["Collection"],
  endpoints: (builder) => ({
    createCollection: builder.mutation<ICollection, {args: CollectionSchema}>({
      query: ({args}) => ({
        url: "/",
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["Collection"],
    }),

    updateCollection: builder.mutation<
      ICollection,
      { collectionId: string; args: CollectionSchema }
    >({
      query: ({ collectionId, args }) => ({
        url: `/${collectionId}`,
        method: "PUT",
        body: args,
      }),
      invalidatesTags: ["Collection"],
    }),

    deleteCollection: builder.mutation<ICollection, { collectionId: string }>({
      query: ({collectionId}) => ({
        url: `/${collectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Collection"],
    }),

    getCollection: builder.query<ICollection, string>({
      query: (collectionId) => ({
        url: `/${collectionId}`,
        method: "GET",
      }),
      providesTags: ["Collection"],
    }),

    getCollections: builder.query<{ data: ICollection[] }, void>({
      query: () => "/",
      transformResponse: (response: any) => response?.data,
      providesTags: ["Collection"],
    }),
  }),
});

export const {
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
  useGetCollectionQuery,
  useGetCollectionsQuery,
} = collectionApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const storageApi = createApi({
  reducerPath: "storageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/storage",
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation<any, { args: FormData }>({
      query: ({ args }) => ({
        url: "/upload-image",
        method: "POST",
        body: args,
      }),

      transformResponse: (response: any) => response?.data,
    }),
  }),
});

export const { useUploadImageMutation } = storageApi;

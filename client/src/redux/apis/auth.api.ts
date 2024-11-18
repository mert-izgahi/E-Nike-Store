import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  SignInSchema,
  SignUpSchema,
  AccountSchema,
  PasswordSchema,
} from "@/lib/zod";
import { authSlice } from "../slices/auth.slice";
import { IUser } from "@/lib/types";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<any, { credentials: SignUpSchema }>({
      query: ({ credentials }) => ({
        url: "/sign-up",
        method: "POST",
        body: credentials,
      }),

      transformResponse: (response: any) => response?.data,
    }),

    signIn: builder.mutation<any, { credentials: SignInSchema }>({
      query: ({ credentials }) => ({
        url: "/sign-in",
        method: "POST",
        body: credentials,
      }),

      transformResponse: (response: any) => response?.data,
    }),

    signOut: builder.mutation<any, void>({
      query: () => ({
        url: "/sign-out",
        method: "POST",
      }),

      transformResponse: (response: any) => response?.data,

      async onQueryStarted(_, api) {
        const { dispatch, queryFulfilled } = api;
        await queryFulfilled;
        dispatch(authSlice.actions.setUser(null));
      },
    }),

    getMe: builder.query<any, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      transformResponse: (response: any) => response?.data,

      async onQueryStarted(_, api) {
        const { dispatch, queryFulfilled } = api;
        const {
          data: { user },
        } = await queryFulfilled;
        dispatch(authSlice.actions.setUser(user as IUser));
      },
    }),

    updateMe: builder.mutation<any, { args: AccountSchema }>({
      query: ({ args }) => ({
        url: "/me",
        method: "PUT",
        body: args,
      }),
      transformResponse: (response: any) => response?.data,
    }),

    updatePassword: builder.mutation<any, { args: PasswordSchema }>({
      query: ({ args }) => ({
        url: "/update-password",
        method: "PUT",
        body: args,
      }),
      transformResponse: (response: any) => response?.data,
    }),


  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useUpdateMeMutation,
  useUpdatePasswordMutation
} = authApi;

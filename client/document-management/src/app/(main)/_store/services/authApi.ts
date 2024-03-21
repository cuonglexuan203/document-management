import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CustomResponse } from "../../_utils/types";
import { UserInfo } from "../features/userSlide";

export interface LoginRequestBody {
    username: string,
    password: string
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/auth/",
        // credentials: "include"
    }),
    refetchOnReconnect: true,
    tagTypes: [],
    endpoints: (builder) => ({
        signIn: builder.mutation<UserInfo, LoginRequestBody>({
            query: (body) => ({
                url: "login",
                body: body,
                method: "POST",
                headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: []
        })
    }),

});

export const { useSignInMutation } = authApi;
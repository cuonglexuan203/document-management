
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseData } from "../../_utils/responseData";

export interface User {
    id: number;
    fullName: string;
    birthDay: string;
    email: string;
    ministry: string;
}

export interface UserRequestBody {
    user: User,
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:5000/api",
        //credentials: "include",
    }),
    refetchOnReconnect: true,
    tagTypes: ["users", "user"],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], null>({
            query: () => "users",
            providesTags: ["users"],
        }),
        getUser: builder.query<User, number>({
            query: (user_id) => ({
                url: `users/${user_id}`,
                method: "GET",
                headers: { "Content-Type": "application/plain" },
            }),
            providesTags: ["user"],

        }),
        addUser: builder.mutation<ResponseData, UserRequestBody>({
            query: (body) => ({
                url: "users",
                method: "POST",
                body,
            }),
            invalidatesTags: ["user"],
        }),
        deleteUser: builder.mutation<ResponseData, number>({
            query: (user_id) => ({
                url: `users/${user_id}`,
                method: "DELETE",
                headers: { "Content-Type": "application/plain" },
            }),
            invalidatesTags: ["user"]
        }),
        updateUser: builder.mutation<ResponseData, UserRequestBody>({
            query: (body) => ({
                url: "users",
                method: "PUT",
                body: body,
                headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: ["user"]

        }),
    }),
});
export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation } = userApi;



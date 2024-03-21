import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Document, Ministry } from "../../_utils/types";

export interface MinistryDocument {
    ministry: Ministry;
    documents: Document[];
}

const BASE_URL = "http://localhost:5000/api/ministries/";

// Create an API instance
export const ministriesApi = createApi({
    reducerPath: "ministriesApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    refetchOnReconnect: true,
    tagTypes: ["ministry", "ministries"],
    endpoints: (builder) => ({
        // Define endpoint to fetch a ministry by ID
        getMinistryById: builder.query<Ministry, number>({
            query: (id) => `${id}`,
            providesTags: ["ministry"],
        }),
        // Define endpoint to fetch all ministries
        getMinistries: builder.query<Ministry[], null>({
            query: () => "",
            providesTags: ["ministries"],
        }),
    }),
});

// Export hooks for querying ministries
export const { useGetMinistryByIdQuery, useGetMinistriesQuery } = ministriesApi;

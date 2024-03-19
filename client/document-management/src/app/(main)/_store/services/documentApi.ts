import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Document } from "../../_utils/types";



export const documentsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
        // credentials: "include"
    }),
    refetchOnReconnect: true,
    tagTypes: ["documents"],
    endpoints: (builder) => ({
        getDocuments: builder.query<Document[], null>({
            query: () => "documents",
            providesTags: ["documents"]
        }),
    }),
});

export const { useGetDocumentsQuery } = documentsApi;
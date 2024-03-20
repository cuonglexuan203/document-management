import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Document } from "../../_utils/types";



export const documentsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
        // credentials: "include"
    }),
    refetchOnReconnect: true,
    tagTypes: ["documents", "document"],
    endpoints: (builder) => ({
        getDocuments: builder.query<Document[], null>({
            query: () => "documents",
            providesTags: ["documents"]
        }),
        getDocumentById: builder.query<Document, null>({
            query: (id) => `documents/${id}`,
            providesTags: ["document"]
        }),
    }),
    
});

export const { useGetDocumentsQuery, useGetDocumentByIdQuery } = documentsApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Document, Ministry } from "../../_utils/types";

export interface MinistryDocument {
    ministry: Ministry,
    documents: Document[],
}

export const documentsApi = createApi({
    reducerPath: "documentsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
        // credentials: "include"
    }),
    refetchOnReconnect: true,
    tagTypes: ["documents", "document", "ministry", "ministries", "ministriesDocuments"],
    endpoints: (builder) => ({
        getDocuments: builder.query<Document[], null>({
            query: () => "documents",
            providesTags: ["documents"]
        }),
        getDocumentById: builder.query<Document, null>({
            query: (id) => `documents/${id}`,
            providesTags: ["document"]
        }),
        getMinistryById: builder.query<Ministry, number>({
            query: (id) => `ministries/${id}`,
            providesTags: ["ministry"]
        }),
        getMinistries: builder.query<Ministry[], null>({
            query: () => `ministries`,
            providesTags: ["ministries"]
        }),
        getMinistriesDocuments: builder.query<MinistryDocument[], null>({
            query: () => `ministries/documents`,
            providesTags: ["ministriesDocuments"]
        }),
    }),

});

export const { useGetDocumentsQuery, useGetDocumentByIdQuery, useGetMinistryByIdQuery, useGetMinistriesQuery, useGetMinistriesDocumentsQuery } = documentsApi;
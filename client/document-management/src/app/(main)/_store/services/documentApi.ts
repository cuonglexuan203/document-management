import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Document, Ministry } from "../../_utils/types";


export const documentsApi = createApi({
    reducerPath: "documentsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/documents/",
        // credentials: "include"
    }),
    refetchOnReconnect: true,
    tagTypes: ["documents", "document"],
    endpoints: (builder) => ({
        getDocuments: builder.query<Document[], null>({
            query: () => "",
            providesTags: ["documents"]
        }),
        getDocumentById: builder.query<Document, null>({
            query: (id) => `${id}`,
            providesTags: ["document"]
        }),

    }),

});

export const { useGetDocumentsQuery, useGetDocumentByIdQuery } = documentsApi;
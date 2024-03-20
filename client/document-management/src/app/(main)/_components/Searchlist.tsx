"use client";
import React, { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { useGetDocumentBySearchQuery, useGetDocumentsQuery } from "@/app/(main)/_store/services/documentApi";
import { useAppDispatch } from "@/app/(main)/_store/hooks";
import { hideLoading, showLoading } from "@/app/(main)/_store/features/statusSlide";

const Searchlist = () => {
    const {
        isLoading,
        isFetching,
        isSuccess,
        data: documents = [],
        error,
    } = useGetDocumentsQuery(null);
    const dispatch = useAppDispatch();

    const {
        data: documentsBySearch = [],
    } = useGetDocumentBySearchQuery(null);
    
    useEffect(() => {
        if (isLoading || isFetching) {
            dispatch(showLoading());
        }
        if (isSuccess) {
            dispatch(hideLoading());
        }
    }, [isLoading, isFetching, isSuccess, dispatch]);

    return (
        <div className="mx-10 my-14">
            {documents.map((document) => (
                <div key={document.id}>
                    <div className="block p-6 border rounded my-2">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                            <a href="#">{document.title}</a>
                        </h5>
                        <p className="font-normal text-gray-700 mb-2">
                            <a href="#">Version: {document.version}</a>
                        </p>
                        <p className="font-normal text-gray-700 mb-2">
                            <a href="#">{document.ministry}</a>
                        </p>
                        <p className="font-normal text-gray-700 mb-2">
                            Time added: {document.addedTime}
                        </p>
                        <p className="font-normal text-gray-700 line-clamp-1">
                            {document.description}
                        </p>
                    </div>
                </div>
            ))}
            {<div className="mt-5 flex justify-center items-center">
                <div className="grid grid-cols-3 gap-4">
                    <span className="text-center"><a href="#">First</a></span>
                    <a href="#"><Pagination total={10} initialPage={1} /></a>
                    <span className="text-center"><a href="#">Last</a></span>
                </div>
            </div>}
        </div>
    );
};

export default Searchlist;
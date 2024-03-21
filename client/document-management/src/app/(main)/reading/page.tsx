"use client";
import React, { useEffect, useState } from 'react'
import { useGetDocumentByIdQuery, useGetDocumentsQuery } from "@/app/(main)/_store/services/documentApi";
import { useAppDispatch } from "@/app/(main)/_store/hooks";
import { hideLoading, showLoading } from "@/app/(main)/_store/features/statusSlide";
import Document from '../_components/Document';

const ReadingPage = () => {
    const {
        isLoading,
        isFetching,
        isSuccess,
        data: document = null,
        error,
    } = useGetDocumentByIdQuery(1);
    const dispatch = useAppDispatch();
    if (isLoading || isFetching) {
        dispatch(showLoading());
    }
    else if (isSuccess) {
        setInterval(() => {
            dispatch(hideLoading())
        }, 500);
    }

    useEffect(() => {
        if (isLoading || isFetching) {
            dispatch(showLoading());
        }
        if (isSuccess) {
            dispatch(hideLoading());
        }
    }, [isLoading, isFetching, isSuccess, dispatch]);
    return (
        <div className='flex items-center justify-evenly min-h-screen bg-gray-100 w-full'>
            <div className="w-3/4 bg-white shadow-xl rounded-lg">

                <a href="#" className="block max-w-fit p-10 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">

                    <h5 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">{document.title}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400 text-3xl">Version {document.version}</p>
                    <a href="{link_destination}" className="font-normal text-blue-500 dark:text-gray-400 text-3xl">{document.ministry}</a>
                    <p className="font-normal text-gray-700 dark:text-gray-400 text-3xl">Time added: {document.addedTime}</p>


                </a>
                <div className="flex justify-center">
                    <iframe
                        //
                        src={document.path}
                        width="100%" // Make the iframe responsive by setting width to 100%
                        height="700" // Set a fixed height or use aspect ratio utilities
                        allow="autoplay"
                        className="shadow-inner"
                    ></iframe>
                </div>
            </div>
        </div>

    )
}

export default ReadingPage
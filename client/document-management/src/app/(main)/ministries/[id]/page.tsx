"use client";
import React, { useEffect } from "react";
import NavBar from "../../_components/NavBar";
import {
  useGetDocumentsQuery,
  useGetMinistryByIdQuery,
} from "../../_store/services/documentApi";
import { showLoading, hideLoading } from "../../_store/features/statusSlide";
import { useAppDispatch } from "../../_store/hooks";

const MinistryDetail = ({ params }: { params: { id: number } }) => {
  const {
    isLoading: ministryLoading,
    isFetching: ministryFetching,
    isSuccess: ministrySuccess,
    data: ministry,
    error: ministryError,
  } = useGetMinistryByIdQuery(params.id);

  const {
    isLoading: documentsLoading,
    isFetching: documentsFetching,
    isSuccess: documentsSuccess,
    data: documents,
    error: documentsError,
  } = useGetDocumentsQuery(null); // Chỉ cần lấy tất cả tài liệu một lần

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      ministryLoading ||
      ministryFetching ||
      documentsLoading ||
      documentsFetching
    ) {
      dispatch(showLoading());
    }
    if (ministrySuccess && documentsSuccess) {
      dispatch(hideLoading());
    }
  }, [
    ministryLoading,
    ministryFetching,
    documentsLoading,
    documentsFetching,
    ministrySuccess,
    documentsSuccess,
    dispatch,
  ]);

  return (
    <main>
      <div className="flex flex-row">
        <div className="flex-1 bg-clip-border rounded-xl shadow-xl sha">
          {ministrySuccess && (
            <>
              <h2 className="text-2xl font-bold">{ministry?.name}</h2>
              <div>
                {documentsSuccess &&
                  documents.map((doc: any) => (
                    <div key={doc.id}>
                      <h3 className="py-3 text-xl font-semibold">
                        {doc.title}
                      </h3>
                      <p className="py-3 text-gray-500">
                        Version: {doc.version}
                      </p>
                      <p className="py-3 text-gray-500">
                        Description: {doc.description}
                      </p>
                      <p className="py-3 text-gray-500">
                        Added Time: {doc.addedTime}
                      </p>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default MinistryDetail;

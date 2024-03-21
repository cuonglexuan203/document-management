"use client";

import React, { useEffect, useState } from "react";
import {
  useGetDocumentByIdQuery,
  useGetDocumentsQuery,
  useGetMinistryByIdQuery,
} from "../../_store/services/documentApi";
import { showLoading, hideLoading } from "../../_store/features/statusSlide";
import { useAppDispatch } from "../../_store/hooks";
import { Navbar } from "@nextui-org/react";
import NavBar from "../../_components/NavBar";

const MinistryDetail = ({ params }: { params: { id: number } }) => {
  const dispatch = useAppDispatch();

  const {
    data: documents,
    error: documentsError,
    isLoading: documentsLoading,
    isFetching: documentsFetching,
  } = useGetDocumentByIdQuery(params.id);

  const [ministryDocuments, setMinistryDocuments] = useState<any[]>([]);

  useEffect(() => {
    if (documentsLoading || documentsFetching) {
      dispatch(showLoading());
    } else {
      dispatch(hideLoading());
    }
  }, [documents, documentsLoading, documentsFetching, dispatch]);

  return (
    <main>
      <div className="flex flex-row ">
        <div className="flex-2 pr-2">
          <NavBar />
        </div>

        <div className="flex-1 bg-clip-border rounded-xl shadow-xl sha">
          <div className="max-w-4xl mx-auto p-4">
            {documents && (
              <>
                <h1 className="text-3xl font-bold text-center mb-8">
                  Title {documents.title}
                </h1>
                <div className="grid">
                  <div key={documents.id} className="bg-white ">
                    <h2 className="text-xl font-semibold mb-2">
                      Description: {documents.description}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      Version: {documents.version}
                    </p>
                    <p className="text-gray-600">
                      Added Time: {documents.addedTime}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MinistryDetail;

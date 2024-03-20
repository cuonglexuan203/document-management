"use client";

import React, { useEffect, useState } from "react";
import {
  useGetDocumentsQuery,
  useGetMinistryByIdQuery,
} from "../../_store/services/documentApi";
import { showLoading, hideLoading } from "../../_store/features/statusSlide";
import { useAppDispatch } from "../../_store/hooks";
import { Navbar } from "@nextui-org/react";
import NavBar from "../../_components/NavBar";

const MinistryDetail = ({ params }: { params: { id: number } }) => {
  const dispatch = useAppDispatch();

  // Lấy thông tin bộ phận dựa trên id
  const {
    data: ministry,
    error: ministryError,
    isLoading: ministryLoading,
    isFetching: ministryFetching,
  } = useGetMinistryByIdQuery(params.id);

  // Lấy danh sách tài liệu từ API
  const {
    data: documents,
    error: documentsError,
    isLoading: documentsLoading,
    isFetching: documentsFetching,
  } = useGetDocumentsQuery(null);

  // Lưu danh sách tài liệu thuộc về bộ phận cụ thể
  const [ministryDocuments, setMinistryDocuments] = useState<any[]>([]);

  useEffect(() => {
    // Hiển thị loading khi đang tải dữ liệu
    if (
      ministryLoading ||
      ministryFetching ||
      documentsLoading ||
      documentsFetching
    ) {
      dispatch(showLoading());
    } else {
      // Ẩn loading khi dữ liệu đã được tải thành công
      dispatch(hideLoading());
    }

    // Lọc danh sách tài liệu thuộc về bộ phận có id tương ứng
    if (ministry && documents) {
      const filteredDocuments = documents.filter(
        (doc: any) => doc.ministry === ministry.ministry
      );
      setMinistryDocuments(filteredDocuments);
    }
  }, [
    ministry,
    documents,
    ministryLoading,
    ministryFetching,
    documentsLoading,
    documentsFetching,
    dispatch,
  ]);

  return (
    <main className="px-6 py-8">
      <NavBar />
      <div className="max-w-4xl mx-auto">
        {ministry && (
          <>
            <h1 className="text-3xl font-bold text-center mb-8">
              Ministry of {ministry.ministry}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ministryDocuments &&
                ministryDocuments.map((doc: any) => (
                  <div
                    key={doc.id}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <h2 className="text-xl font-semibold mb-2">{doc.title}</h2>
                    <p className="text-gray-600 mb-2">Version: {doc.version}</p>
                    <p className="text-gray-600 mb-2">{doc.description}</p>
                    <p className="text-gray-600">Added Time: {doc.addedTime}</p>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default MinistryDetail;

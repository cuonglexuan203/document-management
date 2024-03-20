"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  useGetDocumentsQuery,
  useGetMinistryByIdQuery,
} from "../../_store/services/documentApi";
import { showLoading, hideLoading } from "../../_store/features/statusSlide";
import { useAppDispatch } from "../../_store/hooks";
import { Navbar } from "@nextui-org/react";
import NavBar from "../../_components/NavBar";
import { useRouter } from "next/navigation";

// Component MinistryDetail
const MinistryDetail = ({ params }: { params: { id: number } }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Sử dụng useRef để tham chiếu đến div chứa bảng
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Khởi tạo state và các hook
  const [ministryDocuments, setMinistryDocuments] = useState<any[]>([]);

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

  // Xử lý khi click vào một tài liệu
  const onDocumentClick = (documentId: number) => {
    router.push(`/documents/${documentId}`);
  };

  // Effect hook để cập nhật danh sách tài liệu khi có thay đổi
  useEffect(() => {
    if (
      ministryLoading ||
      ministryFetching ||
      documentsLoading ||
      documentsFetching
    ) {
      dispatch(showLoading());
    } else {
      dispatch(hideLoading());
    }

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

  // Effect hook để kiểm tra và thêm lớp CSS khi bảng vượt quá chiều dài của div chứa nó
  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    if (tableContainer) {
      if (tableContainer.scrollWidth > tableContainer.clientWidth) {
        tableContainer.classList.add("overflow-x-scroll");
      } else {
        tableContainer.classList.remove("overflow-x-scroll");
      }
    }
  }, [ministryDocuments]);

  return (
    <main>
      <div className="flex flex-row">
        <div className="flex-2 pr-2">
          <NavBar />
        </div>

        <div className="flex-1 max-w-4xl mx-auto" ref={tableContainerRef}>
          {ministry && (
            <>
              <h1 className="text-3xl font-bold text-center mb-8 pt-5">
                Ministry of {ministry.ministry}
              </h1>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Version
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Added Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ministryDocuments.map((doc: any) => (
                      <tr
                        key={doc.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900"
                        onClick={() => onDocumentClick(doc.id)}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {doc.title}
                        </th>
                        <td className="px-6 py-4">{doc.description}</td>
                        <td className="px-6 py-4">{doc.version}</td>
                        <td className="px-6 py-4">{doc.addedTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default MinistryDetail;

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useGetMinistriesDocumentsQuery } from "../_store/services/documentApi";
import { useAppDispatch } from "../_store/hooks";

function SideNav({ sidebarOpen, setSidebarOpen }: any) {
  const [ministriesState, setMinistriesState] = useState<{
    [key: string]: boolean;
  }>({});

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    data: ministriesDocuments,
    error: ministriesError,
    isLoading: ministriesLoading,
  } = useGetMinistriesDocumentsQuery(null);

  const toggleMinistry = (ministry: string, ministryId: string) => {
    setMinistriesState((prevState) => ({
      ...prevState,
      [ministry]: !prevState[ministry],
    }));
    router.push(`/ministries/${ministryId}`);
  };

  const onDocumentClick = (Id: string) => {
    router.push(`/documents/${Id}`);
  };

  const sidebarClass = sidebarOpen ? "sidebar-expanded" : "";

  return (
    <div className="relative hide-scrollbar">
      <div
        className={`relative flex flex-col bg-clip-border hide-scrollbar rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[25rem] p-4 shadow-xl shadow-blue-gray-900/5 ${sidebarClass}`}
      >
        <div className="mb-2 p-4">
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
            List of Ministry
          </h5>
        </div>
        <div className="sidebar-content overflow-y-auto max-h-[calc(100vh-10rem)]">
          <nav className="flex flex-col gap-1 min-w-[240px] p-2 text-x1 font-semibold text-gray-700 hide-scrollbar">
            {ministriesDocuments &&
              ministriesDocuments.map((ministryDoc: any) => {
                const ministryId = ministryDoc.id;
                const ministry = ministryDoc.ministry;
                console.log("Ministry:", ministryId);
                return (
                  <div key={ministryId}>
                    <li
                      className="list-none hs-accordion mb-2"
                      id="users-accordion"
                    >
                      <button
                        type="button"
                        className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-lg text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        onClick={() => toggleMinistry(ministry, ministryId)}
                      >
                        <div
                          className="mr-4"
                          style={{ width: "20px", height: "20px" }}
                        >
                          <img
                            src="/images/logo/sidebar/ministry.jpg"
                            alt="Ministry"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {ministry}
                        </span>
                        <svg
                          className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m18 15-6-6-6 6" />
                        </svg>
                        <svg
                          className="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                      {ministriesState[ministry] && (
                        <ul>
                          {ministryDoc.documents.map((doc: any) => (
                            <li key={doc.id} className="list-none">
                              <div
                                role="button"
                                tabIndex={0}
                                onClick={() => onDocumentClick(doc.id)}
                                className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                              >
                                <div
                                  className="grid place-items-center mr-4"
                                  style={{ width: "20px", height: "20px" }}
                                >
                                  <img
                                    src="/images/logo/sidebar/document.jpg"
                                    alt="Document"
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                {doc.title}
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  </div>
                );
              })}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default SideNav;

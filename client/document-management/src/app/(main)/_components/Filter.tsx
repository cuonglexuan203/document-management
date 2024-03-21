import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetDocumentsQuery } from "../_store/services/documentApi";
import { useAppDispatch } from "../_store/hooks";

function Filter({}: any) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [verExpanded, setVerExpanded] = useState(false);
  const [selectedMinistries, setSelectedMinistries] = useState<string[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string[]>([]);
  const sidebar = useRef(null);
  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    setSidebarExpanded((prevSidebarExpanded) => !prevSidebarExpanded);
  };

  const toggleMinistry = (ministry: string) => {
    setSelectedMinistries((prevSelectedMinistries) =>
      prevSelectedMinistries.includes(ministry)
        ? prevSelectedMinistries.filter((m) => m !== ministry)
        : [...prevSelectedMinistries, ministry]
    );
  };

  const toggleVersion = (version: string) => {
    if (selectedVersion.includes(version)) {
      // If the selected version is already included, remove it
      setSelectedVersion([]);
    } else {
      // Otherwise, set the selected version to the current one and remove the other one
      setSelectedVersion([version]);
    }
  };

  useEffect(() => {
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const { data: documents = [], isLoading } = useGetDocumentsQuery(null);

  const ministries: { [key: string]: any[] } = {};

  // Organize documents by ministry
  documents.forEach((doc) => {
    if (!ministries[doc.ministry]) {
      ministries[doc.ministry] = [];
    }
    ministries[doc.ministry].push(doc);
  });

  return (
    <div className="relative">
      <div
        className={`relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[25rem] p-4 shadow-xl shadow-blue-gray-900/5 ${
          sidebarExpanded ? "sidebar-expanded" : ""
        }`}
      >
        <button
          className="absolute top-2 right-2 z-50 bg-gray-200 rounded-full p-2 focus:outline-none"
          onClick={toggleSidebar}
        >
          {sidebarExpanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
        <div className="mb-2 p-4">
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
            Filter
          </h5>
        </div>
        {/*Drop down of Version*/}
        <div className="sidebar-content overflow-y-auto max-h-[calc(100vh-10rem)]">
          <div className="sidebar-content overflow-y-auto max-h-[calc(100vh-10rem)]">
            <div className="mb-2">
              <button
                className="flex items-center space-x-2 text-gray-700 focus:outline-none"
                onClick={() =>
                  setVerExpanded((prevVerExpanded) => !prevVerExpanded)
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700 transform transition-transform"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  transform={verExpanded ? "rotate-90" : ""}
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 5.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-2xl">Version</span>
              </button>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all ${
              !verExpanded ? "h-0" : ""
            }`}
          >
            {/*Ascending*/}
            <div className="space-y-6">
              <div className="flex items-center text-2xl">
                <input
                  id="ascending"
                  name="version"
                  value="ascending"
                  type="checkbox"
                  checked={selectedVersion.includes("ascending")}
                  onChange={() => toggleVersion("ascending")}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="ascending"
                  className="ml-3 min-w-0 flex-1 text-gray-500"
                >
                  Ascending
                </label>
              </div>
              {/*Descending*/}
              <div className="flex items-center text-2xl">
                <input
                  id="descending"
                  name="version"
                  value="descending"
                  type="checkbox"
                  checked={selectedVersion.includes("descending")}
                  onChange={() => toggleVersion("descending")}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="descending"
                  className="ml-3 min-w-0 flex-1 text-gray-500"
                >
                  Descending
                </label>
              </div>
            </div>
          </div>
          {/*Ministry list*/}
          <div className="mb-2">
            <button
              className="flex items-center space-x-2 text-gray-700 focus:outline-none"
              onClick={() =>
                setSidebarExpanded(
                  (prevSidebarExpanded) => !prevSidebarExpanded
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700 transform transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
                transform={sidebarExpanded ? "rotate-90" : ""}
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 5.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-2xl ">Ministry</span>
            </button>
          </div>
          {/*List ministry*/}
          <div
            className={`overflow-hidden transition-all ${
              !sidebarExpanded ? "h-0" : ""
            }`}
          >
            <div className="space-y-6">
              {Object.keys(ministries).map((ministry) => (
                <div key={ministry} className="flex items-center text-2xl">
                  <input
                    id={`filter-mobile-${ministry}`}
                    name="ministries"
                    value={ministry}
                    type="checkbox"
                    checked={selectedMinistries.includes(ministry)}
                    onChange={() => toggleMinistry(ministry)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`filter-mobile-${ministry}`}
                    className="ml-3 min-w-0 flex-1 text-gray-500"
                  >
                    {ministry}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;

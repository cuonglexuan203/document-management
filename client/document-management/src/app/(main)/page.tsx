"use client";
import { useAppDispatch, useAppSelector } from "./_store/hooks";
import { RootState } from "./_store/store";
import { useGetDocumentsQuery } from "./_store/services/documentApi";
import { showLoading, hideLoading } from "./_store/features/statusSlide";
import { Navbar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import NavBar from "./_components/NavBar";

const Home = () => {
  const {
    isLoading,
    isFetching,
    isSuccess,
    data: documents = [],
    error,
  } = useGetDocumentsQuery(null);
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoading());
    }
    if (isSuccess) {
      dispatch(hideLoading());
    }
  }, [isLoading, isFetching, isSuccess, dispatch]);

  const handleDocumentClick = (document: any) => {
    console.log("Display document details:", document);
    setSelectedDocument(document);
  };

  return (
    <main>
      <div className="flex flex-row ">
        <div className="flex-2 pr-2">
          <NavBar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            onDocumentClick={handleDocumentClick}
          />
        </div>

        <div className="flex-1 bg-clip-border rounded-xl shadow-xl sha">
          {selectedDocument && (
            <>
              <div className="mb-2 p-4 text-center">
                <h2 className="text-2xl font-bold">{selectedDocument.title}</h2>
              </div>
              <div className="pl-10">
                <h3 className="py-3 text-xl font-semibold">
                  Ministry: {selectedDocument.ministry}
                </h3>
                <p className="py-3 text-gray-500">
                  Version: {selectedDocument.version}
                </p>
                <p className="py-3 text-gray-500">
                  Description: {selectedDocument.description}
                </p>
                <p className="py-3 text-gray-500">
                  Added Time: {selectedDocument.addedTime}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

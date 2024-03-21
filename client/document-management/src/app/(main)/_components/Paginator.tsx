import React, { useCallback, useState } from 'react'
import { Document } from '../_utils/types';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { pages } from 'next/dist/build/templates/app-page';

const Paginator = ({ documents: docs, totalPage }: { documents: Document[], totalPage: number }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    //

    const itemsPerPage = 10;
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const totalPages = Math.ceil(totalPage / itemsPerPage);
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const handleSortHref = (param: string, value: string) =>
        pathname + "?" + createQueryString(param, value);
    console.log(totalPages)
    return (
        <>
            <div className="pagination flex items-center justify-center space-x-2 my-4">
                <button
                    onClick={() => {
                        paginate(0);
                        router.push(handleSortHref(
                            "page",
                            "0"
                        ))
                    }}
                    disabled={currentPage === 1}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    First
                </button>
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`py-2 px-4 rounded ${i + 1 === currentPage
                            ? "bg-blue-700 text-white"
                            : "bg-blue-500 text-white hover:bg-blue-700"
                            }`}
                    >
                        {i + 1}
                    </button>
                )).slice(
                    Math.max(0, currentPage - 3),
                    Math.min(currentPage + 2, totalPages)
                )}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
                <button
                    onClick={() => paginate(totalPages)}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Last
                </button>
            </div>

        </>
    )
}

export default Paginator
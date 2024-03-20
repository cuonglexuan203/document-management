import React from "react";

const Upload = () => {
    return (
        <div className="mx-10 my-10">
            <p className="mt-14 text-center font-bold text-4xl">Uploading a file</p>
            <div className="mt-14 grid grid-cols-3 gap-4 text-center">
                <div className="flex justify-center items-center flex-col">
                    <p className="font-bold text-2xl">Upload</p>
                    <div className="mt-3 border border-solid border-amber-300 w-64 p-3 bg-amber-300"></div>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <p className="font-bold text-2xl">Detail</p>
                    <div className="mt-3 border border-solid border-gray-300 w-64 p-3 bg-gray-300"></div>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <p className="font-bold text-2xl">Done</p>
                    <div className="mt-3 border border-solid border-gray-300 w-64 p-3 bg-gray-300"></div>
                </div>
            </div>
            <div className="mt-16 ml-28 flex items-center">
                <button className="bg-gray-200 hover:bg-gray-300 text-black py-5 px-4 rounded">Upload thumbnail</button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-5 w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <p className="ml-5 text-base">Image title</p>
            </div>
            <div className="mt-14 mr-28 block flex justify-end">
                <button className="bg-gray-200 hover:bg-gray-300 text-black py-5 px-6 rounded mr-5">Cancel</button>
                <button className="bg-gray-200 hover:bg-gray-300 text-black py-5 px-6 rounded">Next</button>
            </div>
        </div>
    )
}

export default Upload
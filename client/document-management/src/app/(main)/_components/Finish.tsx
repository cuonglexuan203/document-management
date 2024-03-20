import React from "react";

const Finish = () => {
    return (
        <div className="mx-10 my-10">
            <p className="mt-20 mt-20 text-center font-bold text-5xl">Thank you for uploading</p>
            <div className="my-24 flex justify-center items-center">
                <button className="bg-gray-200 hover:bg-gray-300 text-black py-5 px-4 rounded mr-40 ">Upload new document</button>
                <button className="bg-gray-200 hover:bg-gray-300 text-black py-5 px-4 rounded ">Back to Home Page</button>
            </div>
        </div>
    )
}

export default Finish
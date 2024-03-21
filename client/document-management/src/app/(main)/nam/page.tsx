"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../_store/hooks";
import { useGetUsersQuery, User } from "../_store/services/userApi";
import { hideLoading, showLoading } from "../_store/features/statusSlide";
import UserRow from "../_components/AdminDashboard/UserRow";
import UserModal from "../_components/AdminDashboard/UserModal";
import { Modal } from "flowbite";

export type ModalData = {
    user: User,
}
const AdminPage = () => {
    const initialModalData: ModalData = {
        user: {
            id: 0,
            fullName: "",
            birthDay: "",
            email: "",
            ministry: "",
        }
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [modalData, setModalData] = useState(initialModalData);
    const {
        isLoading,
        isFetching,
        // Đổi tên lại data thành userList, default là []
        data: userList = [],
        isSuccess,
        error,     
    } = useGetUsersQuery(null);
    const dispatch = useAppDispatch();


    // if (!isAdmin){
    //     throw new AuthRequiredError();
    // }

    if (isLoading || isFetching) {
    dispatch(showLoading());
    return <div className="h-[50vh] text-center mt-16">Loading...</div>
  } else if (error) {console.log(error.toString());}
  else if (isSuccess) {
    setInterval(() => {
      dispatch(hideLoading());
    }, 500);
  }

  const itemsPerPage = 5;
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = userList.slice(firstItemIndex, lastItemIndex);
  //const $targetEl = document.getElementById('UserModal');
  //const modal = new Modal($targetEl);

    return(
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
        <div>
            <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Action button</span>
                Action
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            {/* <!-- Dropdown menu --> */}
            <div id="dropdownAction" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                    <li>
                        <a href="#" type="button" data-modal-target="UserModal" data-modal-show="UserModal" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Add user</a>
                    </li>
                </ul>
            </div>
        </div>
        {/* Search section */}
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" id="table-search-users" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
        </div>
    </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    No
                </th>
                <th scope="col" className="px-6 py-3">
                    Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Birthday
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Ministry
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {currentItems.map((user_item) => (
                <tr key={user_item.id}>
                    <UserRow user={user_item} setModalData={setModalData}/>
                </tr>

            ))}
        </tbody>
    </table>
            </div>
            <UserModal modalData={modalData}/> 
        </>
    );
};
export default AdminPage;
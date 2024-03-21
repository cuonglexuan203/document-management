"use client";

import { redirect, useRouter } from "next/navigation";
import { FormEvent, MouseEvent, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../_store/hooks";
import { RootState } from "../_store/store";
import {
  toggleIsUserMenuOpen,
  toggleIsSearching,
} from "../_store/features/navBarSlide";
import { UserInfo, removeUser, updateUser } from "../_store/features/userSlide";
import {
  signOut as signOuter,
  signIn as signInter,
  Auth,
} from "../_store/features/authSlide";
import Link from "next/link";

//
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  //
  const dispatch = useAppDispatch();

  const isUserMenuOpen = useAppSelector(
    (state: RootState) => state.navbar.isUserMenuOpen
  );
  const isAdmin: boolean = useAppSelector(state => state.auth.isAdmin);
  //

  const authData: Auth = useAppSelector((state) => state.auth);
  const userInfo: UserInfo = useAppSelector((state) => state.user.info);
  //
  //
  const handleSearchSubmit = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    router.push(`/searching?q=${searchQuery}`);
  };


  const handleCloseUserMenu = () => {
    if (isUserMenuOpen) {
      dispatch(toggleIsUserMenuOpen());
    }
  };

  return (
    <nav
      className="sticky top-0 z-[1000] w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      onClick={() => {
        handleCloseUserMenu();
      }}
    >
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between relative">
          {/* Logo part */}
          <div className="flex items-center justify-start">
            {/* Mobile Menu logo */}
            <button
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              className="p-2 text-gray-600 rounded cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => setIsMobileMenuOpen((s) => !s)}
            >
              <svg
                id="toggleSidebarMobileHamburger"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                id="toggleSidebarMobileClose"
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {/* Logo & Page name */}
            <Link href="/" className="flex ml-2 md:mr-24">
              <Image
                alt="Logo"
                src="/images/logo/logo.png"
                height={32}
                width={32}
                className="mr-4"
              />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Sneaker Store
              </span>
            </Link>
            {/* Search bar */}
            <form
              onSubmit={handleSearchSubmit}
              action="#"
              method="GET"
              className={`absolute -bottom-4 left-1/2 z-10 ${isSearchBarOpen ? "opacity-100 -translate-x-1/2 translate-y-full" : "opacity-0 -translate-x-0 translate-y-0"} transition-all duration-100 lg:opacity-100 lg:static lg:block lg:pl-3.5 select-none`}
            >
              <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1 lg:w-96">
                <div
                  className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
                  onClick={handleSearchSubmit}
                >
                  <FaMagnifyingGlass />
                </div>
                <input
                  type="text"
                  id="topbar-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                />
              </div>
            </form>
          </div>
          {/* Menu part */}
          <div
            className={`${!isMobileMenuOpen ? "hidden " : ""} absolute w-screen left-0 bottom-1 right-0 translate-y-full -translate-x-3 sm:w-auto sm:bottom-0 sm:translate-y-0 sm:translate-x-0 md:flex md:relative md:ml-2 items-center justify-start z-50`}
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 md:rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="group relative">
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex place-items-center w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  News{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* News Dropdown */}
                <div
                  id="dropdownNavbar"
                  className="group-hover:block absolute z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <Link
                        href="/search?q=&sort=newest"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Latest
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/#trending"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Trending
                      </Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="/#others"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      Others
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/help_center"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Help
                </Link>
              </li>
            </ul>
          </div>
          {/* User part */}
          <div className="flex items-center gap-2 z-20">
            {/* Search Icon */}
            <button
              id="toggleSidebarMobileSearch"
              type="button"
              onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
              className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Search</span>
              <FaMagnifyingGlass />
            </button>
            {/* Notification */}

            {/* Cart */}
            <Link
              href={"/cart"}
              className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <span className="sr-only">View notifications</span>
            </Link>
            {/* Theme toggle */}
            <button
              className="hidden xl:block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 
                            hover:text-gray-900 dark:hover:text-white rounded-lg text-sm p-1 sm:p-2.5"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
            {/* Theme tip */}
            <div
              id="tooltip-toggle"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
            >
              Toggle dark mode
              <div
                className="tooltip-arrow"
                data-popper-arrow
              ></div>
            </div>
            {/* User */}
            {authData.isLogging ? (
              <div className="relative flex items-center ml-3">
                {/* Avatar */}
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button-2"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(toggleIsUserMenuOpen());
                    }}
                  >
                    <span className="sr-only">
                      Open user menu
                    </span>
                    <FaUserCircle />
                  </button>
                </div>
                {/* User dropdown */}
                <div
                  className={`${isUserMenuOpen
                    ? "h-fit translate-y-5"
                    : ""
                    } h-0 transition-all duration-150 ease-out absolute top-0 overflow-hidden right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                            id="dropdown-2`}
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white font-bold"
                      role="none"
                    >
                      {userInfo.fullName}
                    </p>
                    <p
                      className="text-sm font-medium text-sky-600 truncate dark:text-gray-300"
                      role="none"
                    >
                      {userInfo.email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link
                        href="/user/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        My Document
                      </Link>
                    </li>
                    {isAdmin && (
                      <li>
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Dash Board
                        </Link>
                      </li>
                    )}
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                          dispatch(removeUser());
                          dispatch(signOuter());
                        }}
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2 text-center"
                onClick={() => router.push("/auth/login")}
              >
                Sign In/Up
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
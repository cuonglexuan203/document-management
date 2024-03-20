"use client";
import Image from "next/image";
import React, { useState } from "react";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="sticky op-0 w-full px-4 bg-white text-gray-800 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center space-x-3">
          <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
            <Image
              className="mb-4 rounded-lg"
              src="/images/logo/logo.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>
          <span className="text-2xl font-semibold justify-between">
            Government Documentation
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            name="search"
            placeholder="Documentation"
            className="px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="p-2 bg-gray-200 rounded-md">Search</button>
        </div>
        <nav className="space-x-4">
          <a href="/" className="hover:text-blue-500">
            Home
          </a>
          <a href="#" className="hover:text-blue-500">
            Upload
          </a>
          <a href="/about" className="hover:text-blue-500">
            About
          </a>
        </nav>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="p-2 hover:bg-gray-200 rounded-full"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            User
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl">
              {isLoggedIn ? (
                <>
                  <a
                    href="/account"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Account
                  </a>
                  <a
                    href="/logout"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Log Out
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="/signup"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Sign Up
                  </a>
                  <a
                    href="/login"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Log In
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

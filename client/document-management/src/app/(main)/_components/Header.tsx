import Image from "next/image";
import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaUpload } from "react-icons/fa";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const fetchSearchSuggestions = (searchTerm) => {
    // Implement your search suggestion fetching logic here
    setSearchSuggestions(["Version 3", "Version 2", "Version 1"]);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 2) {
      fetchSearchSuggestions(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
    }
  };

  return (
    <header className="sticky top-0 w-full px-4 bg-white text-gray-800 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center space-x-3">
          <Image
            className="rounded-lg"
            src="/images/logo/logo.png"
            alt="Logo"
            width={100}
            height={100}
          />
          <span className="text-2xl font-semibold">
            Government Documentation
          </span>
        </div>
        <div className="relative">
          <input
            type="search"
            name="search"
            placeholder="Search Documentation..."
            className="block w-[550px] p-4 pl-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
          {searchSuggestions.length > 0 && (
            <ul className="absolute z-10 left-0 mt-1 py-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              {searchSuggestions.map((suggestion, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-100">
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <nav className="space-x-10">
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
            className="p-2 hover:bg-gray-300 rounded-full"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <FaUserCircle className="text-5xl" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 py-2 w-40 bg-white border rounded shadow-xl">
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

import Image from 'next/image';
import React, { useState } from 'react';
import { FaSearch, FaUserCircle, FaUpload } from 'react-icons/fa';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const fetchSearchSuggestions = (searchTerm) => {
    // Implement your search suggestion fetching logic here
    setSearchSuggestions(['Suggestion 1', 'Suggestion 2']);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 2) {
      fetchSearchSuggestions(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
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
          <span className="text-2xl font-semibold">Government Documentation</span>
        </div>
        <div className="relative">
          <input
            type="text"
            name="search"
            placeholder="Search Documentation..."
            className="search-input flex-grow px-12  w-[550px] py-2 border rounded-md"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <button className="absolute right-3 top-3 text-lg text-gray-500">
            <FaSearch />
          </button>
          {searchSuggestions.length > 0 && (
            <ul className="absolute z-10 left-0 mt-2 py-2 w-full bg-white border rounded shadow-xl">
              {searchSuggestions.map((suggestion, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-100">
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <nav className="space-x-4">
          <a href="/" className="hover:text-blue-500">Home</a>
          <a href="#" className="hover:text-blue-500">
            <FaUpload className="inline mr-1" />Upload
          </a>
          <a href="/about" className="hover:text-blue-500">About</a>
        </nav>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="p-2 hover:bg-gray-200 rounded-full"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <FaUserCircle className="text-3xl" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl">
              {isLoggedIn ? (
                <>
                  <a href="/account" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Account</a>
                  <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Log Out</a>
                </>
              ) : (
                <>
                  <a href="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Sign Up</a>
                  <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Log In</a>
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

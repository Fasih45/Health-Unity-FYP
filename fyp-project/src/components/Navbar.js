import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white relative flex items-center justify-between sm:h-10 md:justify-center py-6 px-4">
      <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" aria-label="Home">
            <img
              src="https://www.svgrepo.com/show/491978/gas-costs.svg"
              height="40"
              width="40"
              alt="Logo"
            />
          </Link>
        </div>
      </div>
      <div className="hidden md:flex space-x-10">
        <Link
          to="/patient/signin"
          className="font-medium hover:text-gray-300 transition duration-150 ease-in-out"
          onClick={closeMenu}
        >
          Patient
        </Link>
        <Link
          to="/doctor/signin"
          className="font-medium hover:text-gray-300 transition duration-150 ease-in-out"
          onClick={closeMenu}
        >
          Doctor
        </Link>
        <Link
          to="/medical_labs/signin"
          className="font-medium hover:text-gray-300 transition duration-150 ease-in-out"
          onClick={closeMenu}
        >
          Medical Labs
        </Link>
        <Link
          to="/pharmacy/signin"
          className="font-medium hover:text-gray-300 transition duration-150 ease-in-out"
          onClick={closeMenu}
        >
          Pharmacy
        </Link>
      </div>
      <div className="md:hidden flex items-center">
        <button
          type="button"
          onClick={toggleMenu}
          aria-label="Main menu"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-gray-500 transition duration-150 ease-in-out"
        >
          <svg
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        {isMenuOpen && (
          <div className="flex flex-col absolute top-16 right-4 bg-gray-800 text-white p-2 rounded-md">
            <Link
              to="/patient/signin"
              className="block py-2 hover:text-gray-300"
              onClick={closeMenu}
            >
              Patient
            </Link>
            <Link
              to="/doctor/signin"
              className="block py-2 hover:text-gray-300"
              onClick={closeMenu}
            >
              Doctor
            </Link>
            <Link
              to="/medical_labs/signin"
              className="block py-2 hover:text-gray-300"
              onClick={closeMenu}
            >
              Medical Labs
            </Link>
            <Link
              to="/pharmacy/signin"
              className="block py-2 hover:text-gray-300"
              onClick={closeMenu}
            >
              Pharmacy
            </Link>
          </div>
        )}
      </div>
      <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
        <span className="inline-flex">
          <Link
            to="/patient/signin"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium text-blue-600 hover:text-blue-500 focus:outline-none transition duration-150 ease-in-out"
          >
            Login
          </Link>
        </span>
        <span className="inline-flex rounded-md shadow ml-2">
          <Link
            to="/patient/signup"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
          >
            Get started
          </Link>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;

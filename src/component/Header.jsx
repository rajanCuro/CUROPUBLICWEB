// src/component/Header.jsx
import React, { useState } from "react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { MdLocalPharmacy } from "react-icons/md";
import { BiTestTube } from "react-icons/bi";
import { FaUserMd } from "react-icons/fa";
import { FaAmbulance } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { HiOutlineLocationMarker } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main container */}
        <div className="flex justify-between items-center h-16">
          {/* Left section */}
          <div className="flex items-center space-x-2">
            
            <span className="text-teal-700 font-bold text-xl">Curo24</span>
          </div>

          {/* Center menu */}
          <div className="hidden md:flex items-center space-x-6 text-gray-700 text-sm font-medium">
            <a href="#" className="flex items-center space-x-1 hover:text-teal-600">
              <MdLocalPharmacy size={18} />
              <span>Pharmacy</span>
            </a>
            <a href="#" className="flex items-center space-x-1 hover:text-teal-600">
              <BiTestTube size={18} />
              <span>Lab</span>
            </a>
            <a href="#" className="flex items-center space-x-1 hover:text-teal-600">
              <HiHome size={18} />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center space-x-1 hover:text-teal-600">
              <FaUserMd size={18} />
              <span>Doctor</span>
            </a>
            <a href="#" className="flex items-center space-x-1 hover:text-teal-600">
              <FaAmbulance size={18} />
              <span>Ambulance</span>
            </a>
            <a href="#" className="flex items-center space-x-1 hover:text-teal-600">
              <HiOutlineLocationMarker size={18} />
              <span>New York, USA</span>
            </a>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className="hidden sm:flex items-center bg-gray-100 px-3 py-1.5 rounded-full w-56">
              <FiSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search for medicine"
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>

            {/* Cart Icon */}
            <button className="relative">
              <FiShoppingCart size={20} className="text-gray-700 hover:text-teal-600" />
              <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs px-1 rounded-full">
                3
              </span>
            </button>

            {/* Profile Image */}
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full border border-gray-300"
            />

            {/* Mobile menu button */}
            <button
              className="md:hidden ml-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4 space-y-3 text-gray-700 text-sm font-medium">
          <a href="#" className="block flex items-center space-x-2 hover:text-teal-600">
            <MdLocalPharmacy size={18} /> <span>Pharmacy</span>
          </a>
          <a href="#" className="block flex items-center space-x-2 hover:text-teal-600">
            <BiTestTube size={18} /> <span>Lab</span>
          </a>
          <a href="#" className="block flex items-center space-x-2 hover:text-teal-600">
            <HiHome size={18} /> <span>Home</span>
          </a>
          <a href="#" className="block flex items-center space-x-2 hover:text-teal-600">
            <FaUserMd size={18} /> <span>Doctor</span>
          </a>
          <a href="#" className="block flex items-center space-x-2 hover:text-teal-600">
            <FaAmbulance size={18} /> <span>Ambulance</span>
          </a>
          <a href="#" className="block flex items-center space-x-2 hover:text-teal-600">
            <HiOutlineLocationMarker size={18} /> <span>New York, USA</span>
          </a>

          {/* Mobile search bar */}
          <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full mt-3">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for medicine"
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

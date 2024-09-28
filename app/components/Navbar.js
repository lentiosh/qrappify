'use client';

import { useState } from 'react';
import { FaQrcode, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative w-full bg-white py-2 px-10 md:px-20 flex justify-between items-center border-b border-gray-200 z-50 font-medium">
      {/* Logo Section */}
      <div className="flex items-center z-10">
        <div className="p-3 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl shadow-neumorphic">
          <FaQrcode className="text-white text-2xl" />
        </div>
        <Link href="/" className="ml-4 text-2xl font-bold text-gray-800 hover:text-[#00cc99] transition duration-300">QRappify</Link>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="md:hidden z-10">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none text-gray-700 hover:text-teal-500 transition duration-200 p-2"
        >
          {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Navigation Links (Desktop) */}
      <div className="hidden md:flex space-x-4 z-10 text-md font-semibold">
        {['Home', 'Features', 'Pricing', 'Contact'].map((item) => (
          <Link
            key={item}
            href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            className="text-gray-800 hover:bg-gray-100 transition duration-200 px-3 py-2 rounded-full"
          >
            {item}
          </Link>
        ))}
        {/* Minimalistic Sign-In Button */}
        <Link
          href="/signin"
          className="text-[#fff] bg-gradient-to-br from-green-400 to-teal-500 shadow-neumorphic px-5 py-2 rounded-full"
        >
          Sign In
        </Link>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white z-20 border-t border-gray-100 md:hidden">
          <div className="flex flex-col items-center py-4 space-y-4">
            {['Home', 'Features', 'Pricing', 'Contact'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-gray-700 hover:bg-gray-100 transition duration-200 text-lg w-3/4 text-center py-2 rounded-full"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            {/* Minimalistic Sign-In Button for Mobile */}
            <Link
              href="/signin"
              className="text-white bg-teal-500 hover:bg-teal-600 transition duration-200 px-6 py-2 rounded-full"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
'use client';

import { useState } from 'react';
import { FaQrcode, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative w-full bg-white py-4 px-6 md:px-12 flex justify-between items-center shadow-neumorphic z-50">
      {/* Background Abstract Shape */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-green-100 via-teal-50 to-blue-100 opacity-30"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
        }}
      ></div>

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
          className="focus:outline-none text-gray-600 hover:text-green-500 transition duration-300 p-2 rounded-full shadow-neumorphic-light"
        >
          {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Navigation Links (Desktop) */}
      <div className="hidden md:flex space-x-6 z-10 font-semibold">
        {['Home', 'About', 'Contact'].map((item) => (
          <Link
            key={item}
            href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            className="text-gray-700 hover:text-green-500 transition duration-300 px-4 py-2 rounded-full shadow-neumorphic hover:shadow-neumorphic-hover"
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-neumorphic z-20 md:hidden">
          <div className="flex flex-col items-center py-4 space-y-4">
            {['Home', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-gray-700 hover:text-green-500 transition duration-300 px-6 py-3 rounded-full shadow-neumorphic hover:shadow-neumorphic-hover w-3/4 text-center"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
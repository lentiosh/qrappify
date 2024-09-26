'use client';

import { useState } from 'react';
import { FaQrcode, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative w-full bg-white py-4 flex justify-between items-center px-6 shadow-neumorphic-light">
      {/* Background Abstract Shape */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-green-200 via-green-100 to-transparent opacity-50"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
        }}
      ></div>

      {/* Logo Section */}
      <div className="flex items-center z-10">
        <div className="p-2 bg-green-500 rounded-full shadow-neumorphic-dark">
          <FaQrcode className="text-white text-2xl" />
        </div>
        <Link href="/" className="ml-3 text-xl font-bold text-gray-800">QRappify</Link>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="md:hidden z-10">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none text-gray-600 hover:text-green-500 transition duration-300"
        >
          {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Navigation Links (Desktop) */}
      <div className="hidden md:flex space-x-6 z-10 font-semibold">
        <Link href="/" className="text-gray-600 hover:text-green-500 transition duration-300">
          Home
        </Link>
        <Link href="/about" className="text-gray-600 hover:text-green-500 transition duration-300">
          About
        </Link>
        <Link href="/contact" className="text-gray-600 hover:text-green-500 transition duration-300">
          Contact
        </Link>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-neumorphic-light z-10 font-semibold">
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-green-500 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-green-500 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-green-500 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
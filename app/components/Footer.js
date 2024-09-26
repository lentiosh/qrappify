'use client';

import { FaQrcode, FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative w-full bg-white py-6 px-6 md:px-12 mt-12 shadow-neumorphic-light">
      {/* Background Abstract Shape */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-green-100 via-teal-50 to-blue-100 opacity-30"
        style={{
          clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}
      ></div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center mb-4 md:mb-0 z-10">
          <div className="p-2 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl shadow-neumorphic">
            <FaQrcode className="text-white text-2xl" />
          </div>
          <span className="ml-3 text-xl font-bold text-gray-800">QRappify</span>
        </div>

        {/* Copyright */}
        <p className="text-center z-10 text-sm text-gray-600">
          © {new Date().getFullYear()} QRappify. All rights reserved.
        </p>
      </div>

      {/* Built with love */}
      <div className="mt-4 text-center z-10 text-sm text-gray-500">
        Built with <FaHeart className="inline-block text-green-500 mx-1" /> by Lentio
      </div>
    </footer>
  );
}
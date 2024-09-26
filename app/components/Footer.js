'use client';

import { FaQrcode } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative w-full bg-white py-6 flex flex-col items-center shadow-neumorphic-light mt-10">
      {/* Background Abstract Shape */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100 to-green-200 opacity-50"
        style={{
          clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}
      ></div>

      {/* Logo Section */}
      <div className="flex items-center mb-4 z-10">
        <div className="p-2 bg-green-500 rounded-full shadow-neumorphic-dark">
          <FaQrcode className="text-white text-2xl" />
        </div>
        <span className="ml-3 text-xl font-bold text-gray-800">QR Code Generator</span>
      </div>

      {/* Footer Text */}
      <p className="text-center z-10 text-base md:text-lg leading-relaxed">
        &copy; {new Date().getFullYear()} <span className="font-bold">QRappify</span>. Built with
        <span className="text-green-400 text-xl mx-2 animate-pulse">❤️</span>
        by <span className="font-semibold">Lentio</span>.
      </p>
    </footer>
  );
}
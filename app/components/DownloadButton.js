'use client';

import { useState } from 'react';
import { FaDownload } from 'react-icons/fa';

export default function DownloadButton({ qrCodeData }) {
  const [downloadFormat, setDownloadFormat] = useState('png');

  const downloadImage = () => {
    const link = document.createElement('a');
    if (downloadFormat === 'png') {
      link.href = qrCodeData.pngDataUrl;
      link.download = 'qr-code.png';
    } else if (downloadFormat === 'svg') {
      link.href = qrCodeData.svgDataUrl;
      link.download = 'qr-code.svg';
    } else if (downloadFormat === 'jpeg') {
      link.href = qrCodeData.jpegDataUrl;
      link.download = 'qr-code.jpeg';
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center mt-6">
      {/* Format Selection */}
      <div className="mb-4 flex space-x-4">
        {/* PNG Option */}
        <label className="flex items-center">
          <input
            type="radio"
            value="png"
            checked={downloadFormat === 'png'}
            onChange={(e) => setDownloadFormat(e.target.value)}
            className="hidden"
          />
          <span
            className={`px-3 py-1 rounded-full cursor-pointer transition-colors duration-200 ${
              downloadFormat === 'png'
                ? 'bg-gray-800 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            PNG
          </span>
        </label>
        {/* SVG Option */}
        <label className="flex items-center">
          <input
            type="radio"
            value="svg"
            checked={downloadFormat === 'svg'}
            onChange={(e) => setDownloadFormat(e.target.value)}
            className="hidden"
          />
          <span
            className={`px-3 py-1 rounded-full cursor-pointer transition-colors duration-200 ${
              downloadFormat === 'svg'
                ? 'bg-gray-800 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            SVG
          </span>
        </label>
        {/* JPEG Option */}
        <label className="flex items-center">
          <input
            type="radio"
            value="jpeg"
            checked={downloadFormat === 'jpeg'}
            onChange={(e) => setDownloadFormat(e.target.value)}
            className="hidden"
          />
          <span
            className={`px-3 py-1 rounded-full cursor-pointer transition-colors duration-200 ${
              downloadFormat === 'jpeg'
                ? 'bg-gray-800 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            JPEG
          </span>
        </label>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadImage}
        className="flex items-center justify-center px-4 py-4 bg-gradient-to-br from-green-400 to-teal-500 text-white font-bold rounded-full shadow-neumorphic hover:shadow-neumorphic-hover transition-all duration-300 transform hover:scale-105"
      >
        <FaDownload className="mr-2" />
        Download QR Code
      </button>
    </div>
  );
}
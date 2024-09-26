'use client';

import Image from 'next/image';
import DownloadButton from './DownloadButton';
import { FaQrcode } from 'react-icons/fa';

export default function QRCodeDisplay({ qrCodeData, error }) {
  return (
    <div className="flex flex-col items-center bg-gray-50 p-8 rounded-lg shadow-neumorphic-light w-full max-w-md">
      {qrCodeData ? (
        <>
          <Image
            src={qrCodeData.pngDataUrl}
            alt="Generated QR Code"
            className="w-full max-w-xs h-auto shadow-lg rounded-md"
            width={300}
            height={300}
          />
          <DownloadButton qrCodeData={qrCodeData} />
        </>
      ) : (
        <div className="text-gray-500 text-center flex flex-col items-center justify-center">
          <p className="mb-4 text-lg">Your QR code will appear here after generation.</p>
          <div className="p-4 rounded-full shadow-neumorphic-dark">
            <FaQrcode className="text-6xl text-gray-400" />
          </div>
        </div>
      )}
      {/* Display Error Message */}
      {error && <p className="text-rose-600 mt-4">{error}</p>}
    </div>
  );
}
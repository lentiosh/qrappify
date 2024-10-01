'use client';

import Image from 'next/image';
import DownloadButton from './DownloadButton';
import { FaQrcode } from 'react-icons/fa';

export default function QRCodeDisplay({ qrCodeData, error }) {
  return (
    <div className="sticky top-4 flex flex-col items-center bg-gray-50 p-8 rounded-lg shadow-lg w-full max-w-md">
      {qrCodeData ? (
        <>
          <Image
            src={qrCodeData.pngDataUrl}
            alt="Generated QR Code"
            className="w-full max-w-xs h-auto shadow-lg rounded-md"
            width={320}
            height={300}
          />
          <DownloadButton qrCodeData={qrCodeData} />
        </>
      ) : (
        <div className="text-gray-300 text-center flex flex-col items-center justify-center">
          <p className="mb-4 text-lg">Your QR code will appear here after generation.</p>
          <div className="p-4 rounded-full shadow-md">
            <FaQrcode className="text-6xl text-gray-200" />
          </div>
        </div>
      )}
      {/* Display Error Message */}
      {error && <p className="text-rose-600 mt-4">{error}</p>}
    </div>
  );
}
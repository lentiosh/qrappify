'use client';

import { useState } from 'react';
import QRCodeTypeButtons from './QRCodeTypeButtons';
import QRCodeTypeForms from './QRCodeTypeForms';
import QRCodeDisplay from './QRCodeDisplay';
import { generateQRCodeAction } from '../actions/actions';

export default function QRCodeGenerator() {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [error, setError] = useState('');
  const [qrType, setQrType] = useState('URL');
  const [loading, setLoading] = useState(false);
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [quality, setQuality] = useState('medium');

  const handleGenerate = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    formData.set('foregroundColor', foregroundColor);
    formData.set('backgroundColor', backgroundColor);
    formData.set('quality', quality);

    try {
      const result = await generateQRCodeAction(formData);
      setQrCodeData(result);
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to generate QR Code');
      setQrCodeData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full p-8 bg-gradient-to-br from-green-50 to-blue-50">
      {/* Left Section */}
      <div className="w-full lg:w-2/3 p-8 bg-white rounded-3xl shadow-neumorphic">
        <form onSubmit={handleGenerate} className="w-full">
          <QRCodeTypeButtons qrType={qrType} setQrType={setQrType} />
          <QRCodeTypeForms qrType={qrType} />

          {/* Color Pickers */}
          <div className="flex flex-col items-center mt-8">
            <div className="flex space-x-12">
              {/* Foreground Color Picker */}
              <div className="flex flex-col items-center">
                <label className="block text-gray-700 mb-2 text-center font-semibold">
                  Foreground Color
                </label>
                <div className="relative">
                  <input
                    type="color"
                    name="foregroundColor"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="w-12 h-12 opacity-0 absolute inset-0 cursor-pointer"
                  />
                  <div
                    className="w-12 h-12 rounded-full shadow-lg"
                    style={{ backgroundColor: foregroundColor }}
                  ></div>
                </div>
              </div>
              {/* Background Color Picker */}
              <div className="flex flex-col items-center">
                <label className="block text-gray-700 mb-2 text-center font-semibold">
                  Background Color
                </label>
                <div className="relative">
                  <input
                    type="color"
                    name="backgroundColor"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-12 opacity-0 absolute inset-0 cursor-pointer"
                  />
                  <div
                    className="w-12 h-12 rounded-full shadow-lg"
                    style={{ backgroundColor: backgroundColor }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quality Selector */}
          <div className="flex flex-col items-center mt-8">
            <label className="block text-gray-800 mb-2 font-semibold">QR Code Quality</label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setQuality('low')}
                className={`px-4 py-2 rounded-full focus:outline-none ${
                  quality === 'low'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Low
              </button>
              <button
                type="button"
                onClick={() => setQuality('medium')}
                className={`px-4 py-2 rounded-full focus:outline-none ${
                  quality === 'medium'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Medium
              </button>
              <button
                type="button"
                onClick={() => setQuality('high')}
                className={`px-4 py-2 rounded-full focus:outline-none ${
                  quality === 'high'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                High
              </button>
            </div>
          </div>

          {/* Display Error Message */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <div className="flex justify-center mt-8">
            {loading ? (
              <button
                type="button"
                className="flex items-center justify-center px-6 py-3 bg-gray-300 text-white font-bold rounded-full shadow-neumorphic transition-all"
                disabled
              >
                Generating...
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-br from-green-400 to-blue-500 text-white font-bold rounded-full shadow-neumorphic hover:shadow-neumorphic-hover transition-all duration-300 transform hover:scale-105"
              >
                Generate QR Code
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/3 p-8 mt-8 lg:mt-0 lg:ml-8 bg-white rounded-3xl shadow-neumorphic">
        <QRCodeDisplay qrCodeData={qrCodeData} error={error} />
      </div>
    </div>
  );
}
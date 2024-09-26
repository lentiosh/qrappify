'use client';

import { useState, useRef } from 'react';
import QRCodeTypeButtons from './QRCodeTypeButtons';
import QRCodeTypeForms from './QRCodeTypeForms';
import QRCodeDisplay from './QRCodeDisplay';
import { generateQRCodeAction } from '../actions/actions';
import { FaQrcode, FaPalette, FaCog } from 'react-icons/fa';

export default function QRCodeGenerator() {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [error, setError] = useState('');
  const [qrType, setQrType] = useState('URL');
  const [loading, setLoading] = useState(false);
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [quality, setQuality] = useState('medium');
  
  const qrCodeSectionRef = useRef(null);

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
      // Scroll to the QR Code section if on mobile
      if (window.innerWidth < 1024 && qrCodeSectionRef.current) {
        qrCodeSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
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
          <div className="mb-8">
            <QRCodeTypeButtons qrType={qrType} setQrType={setQrType} />
          </div>
          
          <div className="mb-8">
            <QRCodeTypeForms qrType={qrType} />
          </div>

          {/* Color Pickers and Quality Selector Centered */}
          <div className="mb-8 flex flex-col items-center">
            <div className="w-full max-w-lg flex flex-col space-y-8">
              <div className="flex justify-around space-x-12 items-center">
                {/* Color Pickers */}
                <div className="flex space-x-8">
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
              <div className="flex flex-col items-center mt-6">
                <label className="block text-gray-800 mb-2 font-semibold">QR Code Quality</label>
                <div className="flex space-x-4">
                  {['low', 'medium', 'high'].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuality(q)}
                      className={`px-4 py-2 rounded-full focus:outline-none transition-all duration-200 ${
                        quality === q
                          ? 'bg-green-500 text-white shadow-md'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {q.charAt(0).toUpperCase() + q.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Display Error Message */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <FaCog className="animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <FaQrcode className="mr-2" />
                  Generate QR Code
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div
        ref={qrCodeSectionRef}
        className="w-full lg:w-1/3 p-8 mt-8 lg:mt-0 lg:ml-8 bg-white rounded-3xl shadow-neumorphic"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FaQrcode className="mr-3 text-green-500" />
          Generated QR Code
        </h2>
        <QRCodeDisplay qrCodeData={qrCodeData} error={error} />
      </div>
    </div>
  );
}
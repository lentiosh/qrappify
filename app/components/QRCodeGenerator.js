'use client';

import { useState, useRef } from 'react';
import QRCodeTypeButtons from './QRCodeTypeButtons';
import QRCodeTypeForms from './QRCodeTypeForms';
import QRCodeDisplay from './QRCodeDisplay';
import StickersSelector from './StickersSelector';
import LogoSelector from './LogoSelector';
import LabelInput from './LabelInput';
import { FaQrcode, FaCog, FaUpload } from 'react-icons/fa';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import ImageIcon from '@/app/images/qr-code.png';

export default function QRCodeGenerator() {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [error, setError] = useState('');
  const [qrType, setQrType] = useState('URL');
  const [loading, setLoading] = useState(false);
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [quality, setQuality] = useState('medium');
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [label, setLabel] = useState('');
  const [customSticker, setCustomSticker] = useState(null);
  const [customLogo, setCustomLogo] = useState(null);

  const qrCodeSectionRef = useRef(null);
  const customStickerInputRef = useRef(null);
  const customLogoInputRef = useRef(null);

  // Accordion state
  const [accordionState, setAccordionState] = useState({
    stickers: false,
    logos: false,
    label: false,
    colors: false,
    quality: false,
  });

  // Toggle accordion sections
  const toggleAccordion = (section) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  // Handler for generating the QR code
  const handleGenerate = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);

    formData.set('qrType', qrType);
    formData.set('foregroundColor', foregroundColor);
    formData.set('backgroundColor', backgroundColor);
    formData.set('quality', quality);
    formData.set('label', label);

    // Handle stickers: either a custom sticker or selected from the list
    if (customSticker) {
      formData.set('customSticker', customSticker);
    } else if (selectedSticker) {
      formData.set('sticker', JSON.stringify(selectedSticker));
    }

    // Handle logos: either a custom logo or selected from the list
    if (customLogo) {
      formData.set('customLogo', customLogo);
    } else if (selectedLogo) {
      formData.set('logo', JSON.stringify(selectedLogo));
    }

    try {
      const response = await fetch('/api/generate-qrcode', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate QR Code');
      }

      const result = await response.json();
      setQrCodeData(result);
      setError('');

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

  // Handler for custom sticker change
  const handleCustomStickerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCustomSticker(file);
      setSelectedSticker(null); // Reset selected sticker when custom sticker is uploaded
    }
  };

  // Handler for custom logo change
  const handleCustomLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCustomLogo(file);
      setSelectedLogo(null); // Reset selected logo when custom logo is uploaded
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full p-4 lg:p-8 bg-gray-50">
      <div className="w-full lg:w-2/3 p-8 bg-white rounded-xl border border-gray-200 shadow-sm">
        <form onSubmit={handleGenerate} className="w-full">
          <QRCodeTypeButtons qrType={qrType} setQrType={setQrType} />

          <div className="border-t border-gray-200 pt-6 mb-6">
            <QRCodeTypeForms qrType={qrType} />
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Sticker Options */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => toggleAccordion('stickers')}
                className="w-full flex justify-between items-center px-6 py-5 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-green-100 focus:outline-none"
              >
                <span className="text-base font-semibold text-gray-900">Sticker Options</span>
                {accordionState.stickers ? (
                  <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="w-6 h-6 text-gray-500" />
                )}
              </button>
              {accordionState.stickers && (
                <div className="mt-4">
                  {!customSticker && (
                    <StickersSelector
                      onStickerSelect={setSelectedSticker}
                      selectedStickerId={selectedSticker?.id}
                    />
                  )}
                  <div className="mt-4 flex justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCustomStickerChange}
                      ref={customStickerInputRef}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => customStickerInputRef.current.click()}
                      className="flex items-center font-semibold px-4 py-2 bg-[#4cd681] text-[#00060c] rounded-2xl shadow-2xl"
                    >
                      <FaUpload className="mr-2" />
                      Upload Sticker
                    </button>
                  </div>
                  {customSticker && (
                    <p className="mt-2 text-center text-gray-700">
                      Custom sticker selected: {customSticker.name}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Logo Options */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => toggleAccordion('logos')}
                className="w-full flex justify-between items-center px-6 py-5 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-green-100 focus:outline-none"
              >
                <span className="text-base font-semibold text-gray-900">Logo Options</span>
                {accordionState.logos ? (
                  <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="w-6 h-6 text-gray-500" />
                )}
              </button>
              {accordionState.logos && (
                <div className="mt-4">
                  {!customLogo && (
                    <LogoSelector
                      onLogoSelect={setSelectedLogo}
                      selectedLogoId={selectedLogo?.id}
                    />
                  )}
                  <div className="mt-4 flex justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCustomLogoChange}
                      ref={customLogoInputRef}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => customLogoInputRef.current.click()}
                      className="flex items-center font-semibold px-4 py-2 bg-[#4cd681] text-[#00060c] rounded-2xl shadow-2xl"
                    >
                      <FaUpload className="mr-2" />
                      Upload Logo
                    </button>
                  </div>
                  {customLogo && (
                    <p className="mt-2 text-center text-gray-700">
                      Custom logo selected: {customLogo.name}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Label Input */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => toggleAccordion('label')}
                className="w-full flex justify-between items-center px-6 py-5 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none"
              >
                <span className="text-base font-semibold text-gray-900">Label</span>
                {accordionState.label ? (
                  <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="w-6 h-6 text-gray-500" />
                )}
              </button>
              {accordionState.label && (
                <div className="mt-4">
                  <LabelInput onLabelChange={setLabel} />
                </div>
              )}
            </div>

            {/* Colors */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => toggleAccordion('colors')}
                className="w-full flex justify-between items-center px-6 py-5 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none"
              >
                <span className="text-base font-semibold text-gray-900">Colors</span>
                {accordionState.colors ? (
                  <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="w-6 h-6 text-gray-500" />
                )}
              </button>
              {accordionState.colors && (
                <div className="mt-4">
                  <div className="flex justify-around items-center">
                    <div className="flex flex-col items-center">
                      <label className="block text-gray-700 mb-2 text-center font-semibold text-lg">
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
                    <div className="flex flex-col items-center">
                      <label className="block text-gray-700 mb-2 text-center font-semibold text-lg">
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
              )}
            </div>

            {/* Quality */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => toggleAccordion('quality')}
                className="w-full flex justify-between items-center px-6 py-5 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none"
              >
                <span className="text-base font-semibold text-gray-900">Quality</span>
                {accordionState.quality ? (
                  <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="w-6 h-6 text-gray-500" />
                )}
              </button>
              {accordionState.quality && (
                <div className="mt-4">
                  <div className="flex flex-col items-center">
                    <label className="block text-gray-800 mb-2 font-semibold text-lg">
                      QR Code Quality
                    </label>
                    <div className="flex space-x-4">
                      {['low', 'medium', 'high'].map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => setQuality(q)}
                          className={`px-4 py-2 rounded-full focus:outline-none transition-all duration-200 ${
                            quality === q
                              ? 'bg-gray-800 text-white shadow-md'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {q.charAt(0).toUpperCase() + q.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
              role="alert"
            >
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
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

      <div
        ref={qrCodeSectionRef}
        className="w-full lg:w-1/3 p-8 mt-8 lg:mt-0 lg:ml-8 bg-white rounded-xl border border-gray-200 shadow-sm"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <Image src={ImageIcon} alt="QR Code Icon" width={40} height={35} className="mr-3" />
          Generated QR Code
        </h2>
        <QRCodeDisplay qrCodeData={qrCodeData} error={error} />
      </div>
    </div>
  );
}
import { useState } from 'react';
import { FaChevronDown, FaCheck } from 'react-icons/fa';

export default function QualitySelector({ quality, setQuality }) {
  const [isOpen, setIsOpen] = useState(false);
  const qualities = ['low', 'medium', 'high'];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">QR Code Quality</h3>
      <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
        >
          {quality.charAt(0).toUpperCase() + quality.slice(1)}
          <FaChevronDown className="ml-2" />
        </button>
        {isOpen && (
          <div className="origin-top-right absolute z-10 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              {qualities.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => {
                    setQuality(q);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center ${
                    quality === q ? 'bg-gray-100' : ''
                  }`}
                >
                  {quality === q && <FaCheck className="mr-2 text-green-500" />}
                  {q.charAt(0).toUpperCase() + q.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState } from 'react';
import { FaPalette } from 'react-icons/fa';

export default function ColorPicker({
  foregroundColor,
  setForegroundColor,
  backgroundColor,
  setBackgroundColor,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Colors</h3>
      <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
        >
          <FaPalette className="mr-2" /> Select Colors
        </button>
        {isOpen && (
          <div className="origin-top-right absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-4">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-gray-700 font-semibold mr-2">
                Foreground:
              </label>
              <input
                type="color"
                name="foregroundColor"
                value={foregroundColor}
                onChange={(e) => setForegroundColor(e.target.value)}
                className="w-10 h-10 p-0 border-none cursor-pointer"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="block text-gray-700 font-semibold mr-2">
                Background:
              </label>
              <input
                type="color"
                name="backgroundColor"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-10 h-10 p-0 border-none cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
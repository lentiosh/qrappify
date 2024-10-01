import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';

export default function StickersSelector({ onStickerSelect, selectedStickerId }) {
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    const fetchStickers = async () => {
      try {
        const response = await fetch('/api/stickers');
        const data = await response.json();
        setStickers(data);
      } catch (error) {
        console.error('Failed to fetch stickers:', error);
      }
    };

    fetchStickers();
  }, []);

  const handleSelect = (sticker) => {
    if (selectedStickerId === sticker.id) {
      onStickerSelect(null);
    } else {
      onStickerSelect(sticker);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-4 justify-center">
        {stickers.map((sticker) => (
          <div
            key={sticker.id}
            className={`relative cursor-pointer p-2 border rounded-lg transition-all duration-200 ${
              selectedStickerId === sticker.id
                ? 'border-green-500 transform scale-105'
                : 'border-gray-300 hover:shadow-md'
            }`}
            onClick={() => handleSelect(sticker)}
          >
            <Image src={sticker.url} alt={sticker.name} width={80} height={80} />
            {selectedStickerId === sticker.id && (
              <div className="absolute top-0 right-0 bg-green-500 text-white rounded-full p-1">
                <FaCheck size={14} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';

export default function LogoSelector({ onLogoSelect, selectedLogoId }) {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await fetch('/api/logos');
        const data = await response.json();
        setLogos(data);
      } catch (error) {
        console.error('Failed to fetch logos:', error);
      }
    };

    fetchLogos();
  }, []);

  const handleSelect = (logo) => {
    if (selectedLogoId === logo.id) {
      onLogoSelect(null);
    } else {
      onLogoSelect(logo);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-4 justify-center">
        {logos.map((logo) => (
          <div
            key={logo.id}
            className={`relative cursor-pointer p-2 border rounded-lg transition-all duration-200 ${
              selectedLogoId === logo.id
                ? 'border-green-500 transform scale-105'
                : 'border-gray-300 hover:shadow-md'
            }`}
            onClick={() => handleSelect(logo)}
          >
            <Image src={logo.url} alt={logo.name} width={80} height={80} />
            {selectedLogoId === logo.id && (
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
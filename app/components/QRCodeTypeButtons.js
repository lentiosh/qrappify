import React from 'react';
import {
  FaLink,
  FaTextHeight,
  FaEnvelope,
  FaSms,
  FaIdCard,
  FaWifi,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from 'react-icons/fa';

const buttonTypes = [
  { type: 'URL', icon: FaLink },
  { type: 'Text', icon: FaTextHeight },
  { type: 'Email', icon: FaEnvelope },
  { type: 'SMS', icon: FaSms },
  { type: 'vCard', icon: FaIdCard },
  { type: 'WiFi', icon: FaWifi },
  { type: 'Event', icon: FaCalendarAlt },
  { type: 'Geo', icon: FaMapMarkerAlt },
  { type: 'Phone', icon: FaPhoneAlt },
  { type: 'WhatsApp', icon: FaWhatsapp },
];

export default function QRCodeTypeButtons({ qrType, setQrType }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
      {buttonTypes.map(({ type, icon: Icon }) => (
        <button
          key={type}
          type="button"
          onClick={() => setQrType(type)}
          className={`flex flex-col items-center justify-center p-1 bg-white rounded-2xl transition-colors duration-200 h-20 w-full border ${
            qrType === type
              ? 'bg-green-100 text-green-800 border-green-300'
              : 'text-gray-800 hover:bg-green-50 border-gray-200'
          }`}
        >
          <Icon className="text-xl mb-1" />
          <span className="text-xs font-semibold text-center">{type}</span>
        </button>
      ))}
    </div>
  );
}
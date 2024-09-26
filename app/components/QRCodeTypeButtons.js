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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
      {buttonTypes.map(({ type, icon: Icon }) => (
        <button
          key={type}
          type="button"
          onClick={() => setQrType(type)}
          className={`flex items-center justify-center p-4 rounded-full transition-all duration-300 ${
            qrType === type
              ? 'bg-gradient-to-br from-green-400 to-blue-500 text-white shadow-neumorphic-inset'
              : 'bg-white text-gray-700 shadow-neumorphic hover:shadow-neumorphic-hover'
          }`}
        >
          <Icon className={`text-2xl ${qrType === type ? 'animate-pulse' : ''}`} />
          <span className="ml-2 font-medium">{type}</span>
        </button>
      ))}
    </div>
  );
}
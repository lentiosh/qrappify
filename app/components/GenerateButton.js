import { FaQrcode } from 'react-icons/fa';

export default function GenerateButton() {
  return (
    <button
      type="submit"
      className="flex items-center justify-center px-8 py-4 bg-gradient-to-br from-green-400 to-blue-500 text-white font-bold rounded-full shadow-neumorphic hover:shadow-neumorphic-hover transition-all duration-300 transform hover:scale-105"
    >
      <FaQrcode className="mr-2 text-2xl" />
      Generate QR Code
    </button>
  );
}
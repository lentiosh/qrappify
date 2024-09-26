import QRCodeGenerator from '@/app/components/QRCodeGenerator';

export const metadata = {
  title: "Create Free QR Codes | QRAppify Online QR Code Generator",
  description: "Generate QR codes for free with QRAppify. Our easy-to-use online tool creates custom QR codes for websites, text, vCards, WiFi, email, phone numbers, and more. Design, customize, and download your QR codes instantly.",
  keywords: "QR code generator, free QR codes, custom QR codes, QR code creator, QR code maker, QRAppify, dynamic QR codes, static QR codes, vCard QR code, WiFi QR code, URL QR code, text QR code, email QR code, phone QR code, SMS QR code, QR code design, QR code customization, QR code analytics, mobile-friendly QR codes, responsive QR codes, business card QR code, menu QR code, event QR code",
  openGraph: {
    title: "Create Free QR Codes | QRAppify Online QR Code Generator",
    description: "Generate QR codes for free with QRAppify. Our easy-to-use online tool creates custom QR codes for websites, text, vCards, WiFi, email, phone numbers, and more.",
    type: "website",
    url: "https://qrappify.com",
    images: [
      {
        url: "https://qrappify.com/home-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QRAppify - Free QR Code Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Free QR Codes | QRAppify Online QR Code Generator",
    description: "Generate QR codes for free with QRAppify. Our easy-to-use online tool creates custom QR codes for websites, text, vCards, WiFi, email, phone numbers, and more.",
    images: ["https://qrappify.com/home-twitter-image.jpg"],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl">
        <QRCodeGenerator />
      </div>
    </div>
  );
}
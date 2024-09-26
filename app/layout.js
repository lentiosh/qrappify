import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "QRAppify - Free QR Code Generator | Create Custom QR Codes Online",
  description: "Generate custom QR codes for free with QRAppify. Easy-to-use online QR code creator for websites, text, vCards, WiFi, and more. Create, customize, and download your QR codes instantly.",
  keywords: "QR code generator, free QR codes, custom QR codes, QR code creator, QR code maker, QRAppify, dynamic QR codes, static QR codes, vCard QR code, WiFi QR code, URL QR code, text QR code, email QR code, phone QR code, SMS QR code, QR code design, QR code customization, QR code analytics, mobile-friendly QR codes, responsive QR codes, qrcode",
  openGraph: {
    title: "QRAppify - Free QR Code Generator | Create Custom QR Codes Online",
    description: "Generate custom QR codes for free with QRAppify. Easy-to-use online QR code creator for websites, text, vCards, WiFi, and more.",
    url: "https://qrappify.com",
    siteName: "QRAppify",
    images: [
      {
        url: "https://qrappify.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QRAppify - Free QR Code Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QRAppify - Free QR Code Generator | Create Custom QR Codes Online",
    description: "Generate custom QR codes for free with QRAppify. Easy-to-use online QR code creator for websites, text, vCards, WiFi, and more.",
    images: ["https://qrappify.com/twitter-image.jpg"],
  },
  robots: "index, follow",
  canonical: "https://qrappify.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="flex-grow container mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
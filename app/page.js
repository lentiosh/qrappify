import QRCodeGenerator from '@/app/components/QRCodeGenerator';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl">
        <QRCodeGenerator />
      </div>
    </div>
  );
}
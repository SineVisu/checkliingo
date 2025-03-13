
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  ipAddress?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ ipAddress }) => {
  const [qrCodeDataURL, setQRCodeDataURL] = useState<string | null>(null);
  const [manualUrl, setManualUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        // Default to localhost if no IP provided
        const baseUrl = ipAddress || 'localhost';
        const expoUrl = `exp://${baseUrl}:8081`;
        setManualUrl(expoUrl);
        
        const qrDataUrl = await QRCode.toDataURL(expoUrl, {
          width: 300,
          margin: 2,
        });
        
        setQRCodeDataURL(qrDataUrl);
      } catch (err) {
        console.error('Error generating QR code:', err);
        setError('Failed to generate QR code');
      }
    };

    generateQRCode();
  }, [ipAddress]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Scan with Expo Go</h2>
      {qrCodeDataURL ? (
        <img 
          src={qrCodeDataURL} 
          alt="Expo QR Code" 
          className="w-60 h-60"
        />
      ) : (
        <div className="w-60 h-60 bg-gray-200 animate-pulse flex items-center justify-center">
          <p className="text-gray-500">Generating QR Code...</p>
        </div>
      )}
      {manualUrl && (
        <div className="text-center mt-4">
          <p className="text-sm font-medium">Or connect manually with:</p>
          <code className="bg-gray-100 px-2 py-1 rounded text-sm break-all mt-1">{manualUrl}</code>
        </div>
      )}
      <p className="text-xs text-gray-500 mt-2 text-center">
        Make sure you have Expo Go installed on your device and that your device is connected to the same network as this computer.
      </p>
    </div>
  );
};


import React, { useState } from 'react';
import { QRCodeDisplay } from '@/components/expo/QRCodeDisplay';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ExpoConnect = () => {
  const [ipAddress, setIpAddress] = useState<string>('');
  const [customIp, setCustomIp] = useState<string>('');

  const handleSetCustomIp = () => {
    setIpAddress(customIp);
  };

  return (
    <div className="container mx-auto max-w-md py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Connect to Expo</h1>
      
      <QRCodeDisplay ipAddress={ipAddress} />
      
      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-medium">Custom Connection</h3>
        <p className="text-sm text-gray-600">
          If you're having trouble connecting, you may need to specify your computer's IP address on your local network.
        </p>
        
        <div className="flex space-x-2">
          <Input
            placeholder="Enter your IP address (e.g., 192.168.1.5)"
            value={customIp}
            onChange={(e) => setCustomIp(e.target.value)}
          />
          <Button onClick={handleSetCustomIp}>Update</Button>
        </div>
      </div>
    </div>
  );
};

export default ExpoConnect;

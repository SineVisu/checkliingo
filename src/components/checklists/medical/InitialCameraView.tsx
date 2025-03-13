
import React from 'react';
import CameraCapture from '../CameraCapture';

interface InitialCameraViewProps {
  onImageCapture: (imageDataUrl: string) => void;
}

const InitialCameraView: React.FC<InitialCameraViewProps> = ({ onImageCapture }) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        Take a clear photo of your medical certificate to automatically extract your name
        and examination date
      </p>
      
      <CameraCapture 
        onImageCapture={onImageCapture}
        captureButtonText="Capture Medical Certificate"
      />
    </div>
  );
};

export default InitialCameraView;

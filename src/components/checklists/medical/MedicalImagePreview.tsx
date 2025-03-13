
import React from 'react';
import CameraCapture from '../CameraCapture';

interface MedicalImagePreviewProps {
  imageUrl: string;
  onImageCapture: (imageDataUrl: string) => void;
}

const MedicalImagePreview: React.FC<MedicalImagePreviewProps> = ({ 
  imageUrl, 
  onImageCapture 
}) => {
  return (
    <div className="space-y-2">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
        <img 
          src={imageUrl} 
          alt="Medical Certificate" 
          className="h-full w-full object-contain" 
        />
      </div>
      
      <CameraCapture 
        onImageCapture={onImageCapture}
        captureButtonText="Retake Photo"
        showRetake={true}
      />
    </div>
  );
};

export default MedicalImagePreview;

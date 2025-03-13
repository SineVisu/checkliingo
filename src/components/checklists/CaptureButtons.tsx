
import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

interface CaptureButtonsProps {
  showLicenseCapture: boolean;
  showMedicalCapture: boolean;
  onCaptureLicense: () => void;
  onCaptureMedical: () => void;
}

const CaptureButtons: React.FC<CaptureButtonsProps> = ({
  showLicenseCapture,
  showMedicalCapture,
  onCaptureLicense,
  onCaptureMedical
}) => {
  return (
    <>
      {showLicenseCapture && (
        <div className="my-4">
          <Button 
            onClick={onCaptureLicense} 
            className="w-full"
          >
            <Camera className="mr-2 h-4 w-4" />
            Capture Pilot Certificate
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-1">
            Take one photo to complete all pilot certificate requirements
          </p>
        </div>
      )}

      {showMedicalCapture && (
        <div className="my-4">
          <Button 
            onClick={onCaptureMedical} 
            className="w-full"
            variant="outline"
          >
            <Camera className="mr-2 h-4 w-4" />
            Capture Medical Certificate
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-1">
            Take one photo to complete all medical requirements
          </p>
        </div>
      )}
    </>
  );
};

export default CaptureButtons;

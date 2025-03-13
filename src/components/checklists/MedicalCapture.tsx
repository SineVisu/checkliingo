
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import ProcessingIndicator from './ProcessingIndicator';
import { useMedicalImageProcessing } from '@/hooks/useMedicalImageProcessing';
import MedicalImagePreview from './medical/MedicalImagePreview';
import InitialCameraView from './medical/InitialCameraView';
import ExtractedMedicalInfo from './medical/ExtractedMedicalInfo';
import MedicalCaptureActions from './medical/MedicalCaptureActions';

interface MedicalCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    name?: string;
    date?: Date;
  }) => void;
}

const MedicalCapture: React.FC<MedicalCaptureProps> = ({ isOpen, onClose, onSave }) => {
  const {
    imageUrl,
    isProcessing,
    extractedData,
    handleImageCapture,
    resetImageData
  } = useMedicalImageProcessing();

  const handleSave = () => {
    // Prepare the data to save
    const dataToSave = {
      name: extractedData.name || undefined,
      date: extractedData.date || undefined
    };
    
    // Check if we have any data to save
    if (!dataToSave.name && !dataToSave.date) {
      toast.error("No information was extracted from medical certificate. Please try again.");
      return;
    }
    
    onSave(dataToSave);
    onClose();
    
    // Clean up
    resetImageData();
  };

  const handleClose = () => {
    onClose();
    resetImageData();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Capture Medical Certificate</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {imageUrl ? (
            <div className="space-y-2">
              <MedicalImagePreview 
                imageUrl={imageUrl} 
                onImageCapture={handleImageCapture} 
              />
              
              <ExtractedMedicalInfo extractedData={extractedData} />
            </div>
          ) : (
            <InitialCameraView onImageCapture={handleImageCapture} />
          )}

          {isProcessing && <ProcessingIndicator message="Processing image..." />}
        </div>
        
        <MedicalCaptureActions 
          onCancel={handleClose}
          onSave={handleSave}
          disabled={!extractedData.name && !extractedData.date}
          isProcessing={isProcessing}
          hasImage={!!imageUrl}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MedicalCapture;

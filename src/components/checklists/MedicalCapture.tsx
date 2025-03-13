
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { format } from 'date-fns';
import CameraCapture from './CameraCapture';
import ProcessingIndicator from './ProcessingIndicator';
import { processMedicalCertificate } from '@/utils/medicalCertUtils';

interface MedicalCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    name?: string;
    date?: Date;
  }) => void;
}

const MedicalCapture: React.FC<MedicalCaptureProps> = ({ isOpen, onClose, onSave }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<{ 
    name: string | null; 
    date: Date | null 
  }>({
    name: null,
    date: null
  });

  const handleImageCapture = (imageDataUrl: string) => {
    setImageUrl(imageDataUrl);
    processMedicalImage(imageDataUrl);
  };

  const processMedicalImage = async (imageData: string) => {
    setIsProcessing(true);
    try {
      const { name, date, validItems } = await processMedicalCertificate(imageData);
      
      setExtractedData({
        name,
        date
      });
      
      // Show success/info toast based on extracted data
      if (validItems.length > 0) {
        toast.success(`Successfully detected: ${validItems.join(", ")}`);
      } else {
        toast.info("Couldn't detect valid information automatically. Please try again or enter manually.");
      }
    } catch (error) {
      console.error("OCR processing error:", error);
      toast.error("Error processing image");
    } finally {
      setIsProcessing(false);
    }
  };

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
    setImageUrl(null);
    setExtractedData({ name: null, date: null });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Capture Medical Certificate</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {imageUrl ? (
            <div className="space-y-2">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                <img 
                  src={imageUrl} 
                  alt="Medical Certificate" 
                  className="h-full w-full object-contain" 
                />
              </div>
              
              {/* Show extracted information */}
              <div className="space-y-3 mt-4">
                <h3 className="text-sm font-medium">Extracted Information:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{extractedData.name || 'Not detected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date of Examination:</span>
                    <span className="font-medium">
                      {extractedData.date 
                        ? format(extractedData.date, 'MMMM d, yyyy') 
                        : 'Not detected'}
                    </span>
                  </div>
                </div>
              </div>
              
              <CameraCapture 
                onImageCapture={handleImageCapture}
                captureButtonText="Retake Photo"
                showRetake={true}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Take a clear photo of your medical certificate to automatically extract your name
                and examination date
              </p>
              
              <CameraCapture 
                onImageCapture={handleImageCapture}
                captureButtonText="Capture Medical Certificate"
              />
            </div>
          )}

          {isProcessing && <ProcessingIndicator message="Processing image..." />}
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSave}
            disabled={isProcessing || (!extractedData.name && !extractedData.date)}
          >
            {imageUrl ? 'Save All' : 'Skip'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalCapture;

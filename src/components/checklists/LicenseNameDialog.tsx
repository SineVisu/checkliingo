
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CameraCapture from './CameraCapture';
import ProcessingIndicator from './ProcessingIndicator';
import LicenseNameForm from './LicenseNameForm';
import { processImageWithOCR } from '@/utils/ocrUtils';

interface LicenseNameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  dialogTitle?: string;
}

const LicenseNameDialog: React.FC<LicenseNameDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  dialogTitle = "Enter Certificate Name" 
}) => {
  const [licenseName, setLicenseName] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const extractNameFromText = (text: string): string | null => {
    // Look for patterns like "NAME: John Doe" or just capitalized words
    const namePatterns = [
      /NAME[\s:]+([\w\s]+)/i,
      /HOLDER[\s:]+([\w\s]+)/i,
      /PILOT[\s:]+([\w\s]+)/i
    ];
    
    for (const pattern of namePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const nameParts = match[1].trim().split(/\s+/);
        // Format as First, Middle, Last if we have enough parts
        if (nameParts.length >= 3) {
          return `${nameParts[0]}, ${nameParts[1]}, ${nameParts.slice(2).join(' ')}`;
        } else if (nameParts.length === 2) {
          return `${nameParts[0]}, ${nameParts[1]}`;
        }
        return match[1].trim();
      }
    }
    
    // Fallback: look for consecutive capitalized words (potential name)
    const lines = text.split('\n');
    for (const line of lines) {
      // Look for lines with 2-3 words that might be a name
      if (line.length > 5 && line.length < 40) {
        const nameParts = line.trim().split(/\s+/);
        if (nameParts.length >= 2 && nameParts.every(part => /^[A-Z]/.test(part))) {
          if (nameParts.length >= 3) {
            return `${nameParts[0]}, ${nameParts[1]}, ${nameParts.slice(2).join(' ')}`;
          } else if (nameParts.length === 2) {
            return `${nameParts[0]}, ${nameParts[1]}`;
          }
          return line.trim();
        }
      }
    }
    
    return null;
  };

  const handleImageCapture = (imageDataUrl: string) => {
    setImageUrl(imageDataUrl);
    
    // Process the image with OCR
    handleProcessImage(imageDataUrl);
  };

  const handleProcessImage = async (imageData: string) => {
    const handleProcessingStart = () => setIsProcessing(true);
    const handleProcessingEnd = () => setIsProcessing(false);
    
    const extractedText = await processImageWithOCR(
      imageData, 
      handleProcessingStart, 
      handleProcessingEnd
    );
    
    if (extractedText) {
      // Try to find a name pattern
      const possibleName = extractNameFromText(extractedText);
      
      if (possibleName) {
        setLicenseName(possibleName);
        toast.success("Name detected from certificate");
      } else {
        toast.info("Couldn't detect name automatically. Please enter manually.");
      }
    }
  };

  const handleSave = () => {
    if (!licenseName.trim()) {
      toast.error("Please enter your certificate name");
      return;
    }
    
    // Ensure the name is in the correct format (First, Middle, Last)
    let formattedName = licenseName;
    if (!licenseName.includes(',')) {
      const parts = licenseName.trim().split(/\s+/);
      if (parts.length >= 3) {
        formattedName = `${parts[0]}, ${parts[1]}, ${parts.slice(2).join(' ')}`;
      } else if (parts.length === 2) {
        formattedName = `${parts[0]}, ${parts[1]}`;
      }
    }
    
    onSave(formattedName);
    onClose();
    
    // Clean up
    setImageUrl(null);
    setLicenseName('');
  };

  const handleClose = () => {
    setImageUrl(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <LicenseNameForm 
            licenseName={licenseName}
            onLicenseNameChange={setLicenseName}
          />
          
          {isProcessing ? (
            <ProcessingIndicator message="Processing image..." />
          ) : imageUrl ? (
            <div className="space-y-2">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                <img 
                  src={imageUrl} 
                  alt="Certificate" 
                  className="h-full w-full object-contain" 
                />
              </div>
              <CameraCapture
                onImageCapture={handleImageCapture}
                showRetake={true}
                captureButtonText="Capture Certificate Photo"
                retakeButtonText="Retake Photo"
              />
            </div>
          ) : (
            <CameraCapture
              onImageCapture={handleImageCapture}
              captureButtonText="Capture Certificate Photo"
            />
          )}

          {/* Hidden canvas for processing the image */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSave}
            disabled={isProcessing}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LicenseNameDialog;

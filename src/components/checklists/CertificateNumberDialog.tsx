
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { processImageWithOCR, extractCertificateNumber, validateCertificateNumber } from "@/utils/ocrUtils";
import CameraCapture from './CameraCapture';
import CertificateNumberForm from './CertificateNumberForm';
import ProcessingIndicator from './ProcessingIndicator';

interface CertificateNumberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (certificateNumber: string) => void;
  dialogTitle?: string;
}

const CertificateNumberDialog: React.FC<CertificateNumberDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  dialogTitle = "Certificate Number"
}) => {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageCapture = (imageDataUrl: string) => {
    setImageUrl(imageDataUrl);
    processImageWithOCR(
      imageDataUrl, 
      () => setIsProcessing(true), 
      () => setIsProcessing(false)
    ).then(extractedText => {
      if (extractedText) {
        const certNumber = extractCertificateNumber(extractedText);
        if (certNumber) {
          setCertificateNumber(certNumber);
          toast.success("Certificate number detected from license");
        } else {
          toast.info("Couldn't detect certificate number automatically. Please enter manually.");
        }
      }
    });
  };

  const handleSave = () => {
    if (!certificateNumber.trim()) {
      toast.error("Please enter a certificate number");
      return;
    }
    
    if (!validateCertificateNumber(certificateNumber)) {
      toast.error("Certificate number must be at least 7 digits");
      return;
    }
    
    onSave(certificateNumber);
    onClose();
    
    // Reset state
    setImageUrl(null);
    setCertificateNumber('');
  };

  const handleClose = () => {
    // Reset state when dialog is closed
    setImageUrl(null);
    setCertificateNumber('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <CertificateNumberForm 
            certificateNumber={certificateNumber}
            onCertificateNumberChange={setCertificateNumber}
          />
          
          {imageUrl ? (
            <div className="space-y-2">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                <img 
                  src={imageUrl} 
                  alt="License" 
                  className="h-full w-full object-contain" 
                />
              </div>
              <CameraCapture 
                onImageCapture={handleImageCapture} 
                showRetake={true}
                retakeButtonText="Retake Photo"
              />
            </div>
          ) : (
            <CameraCapture 
              onImageCapture={handleImageCapture}
              captureButtonText="Capture License Photo"
            />
          )}

          {isProcessing && (
            <ProcessingIndicator message="Processing image..." />
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

export default CertificateNumberDialog;

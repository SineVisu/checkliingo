
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createWorker } from 'tesseract.js';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  const handleCapture = async () => {
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setShowCamera(true);
      }
    } catch (error) {
      toast.error("Unable to access camera");
      console.error("Camera access error:", error);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert to image URL
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    setImageUrl(imageDataUrl);
    
    // Stop the camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setShowCamera(false);
    
    // Process the image with OCR
    processImageWithOCR(imageDataUrl);
  };

  const processImageWithOCR = async (imageData: string) => {
    setIsProcessing(true);
    try {
      const worker = await createWorker('eng');
      
      const result = await worker.recognize(imageData);
      console.log("OCR Result:", result);
      
      // Extract the text
      const extractedText = result.data.text;
      
      // Try to find certificate number
      const certNumber = extractCertificateNumber(extractedText);
      
      if (certNumber) {
        setCertificateNumber(certNumber);
        toast.success("Certificate number detected from license");
      } else {
        toast.info("Couldn't detect certificate number automatically. Please enter manually.");
      }
      
      await worker.terminate();
    } catch (error) {
      console.error("OCR processing error:", error);
      toast.error("Error processing image");
    } finally {
      setIsProcessing(false);
    }
  };

  const extractCertificateNumber = (text: string): string | null => {
    // Look for patterns like "Certificate Number: 1234567" or "Cert No: 1234567"
    const certNumberPatterns = [
      /CERTIFICATE\s*(?:NO|NUMBER|#)[:.\s]*(\d{7,})/i,
      /CERT(?:IFICATE)?\s*(?:NO|NUMBER|#)[:.\s]*(\d{7,})/i,
      /(?:NO|NUMBER|#)\s*[:.]?\s*(\d{7,})/i
    ];
    
    for (const pattern of certNumberPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    
    // Fallback: look for any sequence of 7 or more digits
    const digitSequences = text.match(/\d{7,}/g);
    if (digitSequences && digitSequences.length > 0) {
      return digitSequences[0];
    }
    
    return null;
  };

  const validateCertificateNumber = (number: string): boolean => {
    return /^\d{7,}$/.test(number);
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
    
    // Clean up
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
    setImageUrl(null);
    setCertificateNumber('');
  };

  const handleClose = () => {
    // Clean up resources when dialog is closed
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
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
          <div className="flex flex-col gap-4">
            <Label htmlFor="certificateNumber">Certificate Number</Label>
            <Input
              id="certificateNumber"
              value={certificateNumber}
              onChange={(e) => {
                // Only allow numeric input
                const numericValue = e.target.value.replace(/\D/g, '');
                setCertificateNumber(numericValue);
              }}
              placeholder="Enter your certificate number (7+ digits)"
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <p className="text-xs text-muted-foreground">
              Must be at least 7 digits, numbers only
            </p>
          </div>
          
          {showCamera ? (
            <div className="space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                <video 
                  ref={videoRef} 
                  className="h-full w-full object-cover"
                  autoPlay
                  playsInline
                />
              </div>
              <Button 
                onClick={takePhoto} 
                className="w-full"
              >
                Capture Photo
              </Button>
            </div>
          ) : imageUrl ? (
            <div className="space-y-2">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                <img 
                  src={imageUrl} 
                  alt="License" 
                  className="h-full w-full object-contain" 
                />
              </div>
              <Button 
                onClick={handleCapture} 
                variant="outline" 
                className="w-full"
              >
                Retake Photo
              </Button>
            </div>
          ) : (
            <Button 
              onClick={handleCapture} 
              variant="outline" 
              className="w-full"
              disabled={isProcessing}
            >
              <Camera className="mr-2 h-4 w-4" />
              Capture License Photo
            </Button>
          )}

          {isProcessing && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2">Processing image...</span>
            </div>
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

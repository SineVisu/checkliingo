
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Camera } from "lucide-react";
import { toast } from "sonner";
import { createWorker } from 'tesseract.js';
import { format } from 'date-fns';

interface LicenseCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    name?: string;
    date?: Date;
    certificateNumber?: string;
  }) => void;
}

const LicenseCapture: React.FC<LicenseCaptureProps> = ({ isOpen, onClose, onSave }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<{
    name: string | null;
    date: Date | null;
    certificateNumber: string | null;
  }>({
    name: null,
    date: null,
    certificateNumber: null,
  });
  
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
    
    // Process the image with OCR to extract all info
    processLicenseImageWithOCR(imageDataUrl);
  };

  const processLicenseImageWithOCR = async (imageData: string) => {
    setIsProcessing(true);
    try {
      const worker = await createWorker('eng');
      
      const result = await worker.recognize(imageData);
      console.log("OCR Result for full certificate:", result);
      
      // Extract all needed information
      const extractedText = result.data.text;
      
      // Extract name, date, and certificate number
      const name = extractNameFromText(extractedText);
      const date = extractDateFromText(extractedText);
      const certificateNumber = extractCertificateNumber(extractedText);
      
      setExtractedData({
        name,
        date,
        certificateNumber
      });
      
      // Show success/info toast based on extracted data
      if (name || date || certificateNumber) {
        let extractedItems = [];
        if (name) extractedItems.push("name");
        if (date) extractedItems.push("issuance date");
        if (certificateNumber) extractedItems.push("certificate number");
        
        if (extractedItems.length > 0) {
          toast.success(`Successfully detected: ${extractedItems.join(", ")}`);
        } else {
          toast.info("Couldn't detect information automatically. Please try again or enter manually.");
        }
      }
      
      await worker.terminate();
    } catch (error) {
      console.error("OCR processing error:", error);
      toast.error("Error processing image");
    } finally {
      setIsProcessing(false);
    }
  };

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

  const extractDateFromText = (text: string): Date | null => {
    // Common date formats: MM/DD/YYYY, MM-DD-YYYY, Month DD, YYYY
    const datePatterns = [
      // MM/DD/YYYY or MM-DD-YYYY
      /\b(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-](19|20)\d{2}\b/g,
      // Month DD, YYYY
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(0?[1-9]|[12][0-9]|3[01])(st|nd|rd|th)?,\s+(19|20)\d{2}\b/gi,
      // DD/MM/YYYY (international format)
      /\b(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[0-2])[\/\-](19|20)\d{2}\b/g,
      // Common certificate patterns
      /ISSUE\s*DATE\s*:?\s*(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-](19|20)\d{2}/i,
      /DATE\s*ISSUED\s*:?\s*(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-](19|20)\d{2}/i
    ];
    
    for (const pattern of datePatterns) {
      const matches = text.match(pattern);
      if (matches && matches.length > 0) {
        // Try to parse the matched date
        try {
          // Extract just the date part from the match
          let dateString = matches[0];
          
          // Remove any text before the actual date for patterns like "ISSUE DATE: MM/DD/YYYY"
          if (dateString.includes(":")) {
            dateString = dateString.split(":")[1].trim();
          }
          
          // Try to parse with Date.parse
          const parsedDate = new Date(dateString);
          if (!isNaN(parsedDate.getTime())) {
            return parsedDate;
          }
          
          // Alternative parsing for MM/DD/YYYY format
          const mmddyyyy = dateString.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
          if (mmddyyyy) {
            const [, month, day, year] = mmddyyyy;
            return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          }
        } catch (e) {
          console.error("Date parsing error:", e);
        }
      }
    }
    
    return null;
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

  const handleSave = () => {
    // Prepare the data to save
    const dataToSave = {
      name: extractedData.name || undefined,
      date: extractedData.date || undefined,
      certificateNumber: extractedData.certificateNumber || undefined
    };
    
    // Check if we have any data to save
    if (!dataToSave.name && !dataToSave.date && !dataToSave.certificateNumber) {
      toast.error("No information was extracted from certificate. Please try again.");
      return;
    }
    
    onSave(dataToSave);
    onClose();
    
    // Clean up
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
    setImageUrl(null);
    setExtractedData({ name: null, date: null, certificateNumber: null });
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
          <DialogTitle>Capture Pilot Certificate</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
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
                  alt="Certificate" 
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
                    <span className="text-muted-foreground">Date of Issuance:</span>
                    <span className="font-medium">
                      {extractedData.date 
                        ? format(extractedData.date, 'MMMM d, yyyy') 
                        : 'Not detected'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Certificate Number:</span>
                    <span className="font-medium">{extractedData.certificateNumber || 'Not detected'}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleCapture} 
                variant="outline" 
                className="w-full"
              >
                <Camera className="mr-2 h-4 w-4" />
                Retake Photo
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Take a clear photo of your pilot certificate to automatically extract your name, 
                issuance date, and certificate number
              </p>
              
              <Button 
                onClick={handleCapture} 
                className="w-full"
                disabled={isProcessing}
              >
                <Camera className="mr-2 h-4 w-4" />
                Capture Certificate Photo
              </Button>
            </div>
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
            disabled={isProcessing || (!extractedData.name && !extractedData.date && !extractedData.certificateNumber)}
          >
            {imageUrl ? 'Save All' : 'Skip'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LicenseCapture;

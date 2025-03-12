import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createWorker } from 'tesseract.js';

interface LicenseNameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const LicenseNameDialog: React.FC<LicenseNameDialogProps> = ({ isOpen, onClose, onSave }) => {
  const [licenseName, setLicenseName] = useState('');
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
      
      // Try to find a name pattern (simple heuristic - could be improved)
      const possibleName = extractNameFromText(extractedText);
      
      if (possibleName) {
        setLicenseName(possibleName);
        toast.success("Name detected from license");
      } else {
        toast.info("Couldn't detect name automatically. Please enter manually.");
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

  const handleSave = () => {
    if (!licenseName.trim()) {
      toast.error("Please enter your license name");
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
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
    setImageUrl(null);
    setLicenseName('');
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
          <DialogTitle>Enter License Name</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="licenseName">Name (First, Middle, Last)</Label>
            <Input
              id="licenseName"
              value={licenseName}
              onChange={(e) => setLicenseName(e.target.value)}
              placeholder="Enter your name as shown on license"
            />
            <p className="text-xs text-muted-foreground">
              Format: First, Middle, Last (include commas)
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

export default LicenseNameDialog;

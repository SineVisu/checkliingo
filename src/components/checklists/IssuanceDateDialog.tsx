import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createWorker } from 'tesseract.js';
import { cn } from "@/lib/utils";
import DateSelector from '@/components/common/DateSelector';

interface IssuanceDateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (date: Date) => void;
}

const IssuanceDateDialog: React.FC<IssuanceDateDialogProps> = ({ isOpen, onClose, onSave }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  const handleCapture = async () => {
    try {
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
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    setImageUrl(imageDataUrl);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setShowCamera(false);
    
    processImageWithOCR(imageDataUrl);
  };

  const processImageWithOCR = async (imageData: string) => {
    setIsProcessing(true);
    try {
      const worker = await createWorker('eng');
      
      const result = await worker.recognize(imageData);
      console.log("OCR Result:", result);
      
      const extractedText = result.data.text;
      
      const extractedDate = extractDateFromText(extractedText);
      
      if (extractedDate) {
        setDate(extractedDate);
        toast.success("Date detected from license");
      } else {
        toast.info("Couldn't detect date automatically. Please select manually.");
      }
      
      await worker.terminate();
    } catch (error) {
      console.error("OCR processing error:", error);
      toast.error("Error processing image");
    } finally {
      setIsProcessing(false);
    }
  };

  const extractDateFromText = (text: string): Date | null => {
    const datePatterns = [
      /\b(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-](19|20)\d{2}\b/g,
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(0?[1-9]|[12][0-9]|3[01])(st|nd|rd|th)?,\s+(19|20)\d{2}\b/gi,
      /\b(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[0-2])[\/\-](19|20)\d{2}\b/g,
      /ISSUE\s*DATE\s*:?\s*(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-](19|20)\d{2}/i,
      /DATE\s*ISSUED\s*:?\s*(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-](19|20)\d{2}/i
    ];
    
    for (const pattern of datePatterns) {
      const matches = text.match(pattern);
      if (matches && matches.length > 0) {
        let dateString = matches[0];
        
        if (dateString.includes(":")) {
          dateString = dateString.split(":")[1].trim();
        }
        
        const parsedDate = new Date(dateString);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
        
        const mmddyyyy = dateString.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
        if (mmddyyyy) {
          const [, month, day, year] = mmddyyyy;
          return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        }
      }
    }
    
    return null;
  };

  const handleSave = () => {
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    
    onSave(date);
    onClose();
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
    setImageUrl(null);
    setDate(undefined);
  };

  const handleClose = () => {
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
          <DialogTitle>Enter Date of Issuance</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="issuanceDate">Date (Month, Day, Year)</Label>
            <DateSelector
              date={date}
              onDateChange={setDate}
              placeholder="Select date"
            />
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

export default IssuanceDateDialog;

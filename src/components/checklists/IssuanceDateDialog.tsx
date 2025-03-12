
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Camera, Loader2, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { createWorker } from 'tesseract.js';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
      
      // Try to find date patterns
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
    // Common date formats: MM/DD/YYYY, MM-DD-YYYY, Month DD, YYYY
    const datePatterns = [
      // MM/DD/YYYY or MM-DD-YYYY
      /\b(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-](19|20)\d{2}\b/g,
      // Month DD, YYYY
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(0?[1-9]|[12][0-9]|3[01])(st|nd|rd|th)?,\s+(19|20)\d{2}\b/gi,
      // DD/MM/YYYY (international format)
      /\b(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[0-2])[\/\-](19|20)\d{2}\b/g,
      // Common license patterns
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

  const handleSave = () => {
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    
    onSave(date);
    onClose();
    
    // Clean up
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
    setImageUrl(null);
    setDate(undefined);
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
          <DialogTitle>Enter Date of Issuance</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="issuanceDate">Date (Month, Day, Year)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "MMMM d, yyyy") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="pointer-events-auto p-3"
                />
              </PopoverContent>
            </Popover>
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

export default IssuanceDateDialog;

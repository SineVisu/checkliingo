
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { toast } from "sonner";

interface CameraCaptureProps {
  onImageCapture: (imageDataUrl: string) => void;
  showRetake?: boolean;
  captureButtonText?: string;
  retakeButtonText?: string;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
  onImageCapture,
  showRetake = false,
  captureButtonText = "Capture Photo",
  retakeButtonText = "Retake Photo"
}) => {
  const [showCamera, setShowCamera] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    
    // Pass the image data URL to the parent component
    onImageCapture(imageDataUrl);
  };

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
    setImageUrl(null);
  };

  // Clean up on unmount
  React.useEffect(() => {
    return cleanup;
  }, []);

  if (showCamera) {
    return (
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
          {captureButtonText}
        </Button>
      </div>
    );
  }

  if (imageUrl && showRetake) {
    return (
      <div className="space-y-2">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
          <img 
            src={imageUrl} 
            alt="Captured image" 
            className="h-full w-full object-contain" 
          />
        </div>
        <Button 
          onClick={handleCapture} 
          variant="outline" 
          className="w-full"
        >
          <Camera className="mr-2 h-4 w-4" />
          {retakeButtonText}
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleCapture} 
      variant="outline" 
      className="w-full"
    >
      <Camera className="mr-2 h-4 w-4" />
      {captureButtonText}
    </Button>
  );
};

export default CameraCapture;

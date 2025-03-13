
import { useState } from 'react';
import { toast } from 'sonner';
import { processMedicalCertificate } from '@/utils/medicalCertUtils';

export interface MedicalExtractedData {
  name: string | null;
  date: Date | null;
}

export const useMedicalImageProcessing = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<MedicalExtractedData>({
    name: null,
    date: null
  });

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

  const handleImageCapture = (imageDataUrl: string) => {
    setImageUrl(imageDataUrl);
    processMedicalImage(imageDataUrl);
  };

  const resetImageData = () => {
    setImageUrl(null);
    setExtractedData({ name: null, date: null });
  };

  return {
    imageUrl,
    isProcessing,
    extractedData,
    handleImageCapture,
    resetImageData,
  };
};

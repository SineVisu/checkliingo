
import { toast } from "sonner";
import { createWorker } from 'tesseract.js';

// Process an image with OCR and extract text
export const processImageWithOCR = async (
  imageData: string, 
  onProcessingStart?: () => void,
  onProcessingEnd?: () => void
): Promise<string | null> => {
  onProcessingStart?.();
  
  try {
    const worker = await createWorker('eng');
    const result = await worker.recognize(imageData);
    console.log("OCR Result:", result);
    
    // Extract the text
    const extractedText = result.data.text;
    await worker.terminate();
    
    return extractedText;
  } catch (error) {
    console.error("OCR processing error:", error);
    toast.error("Error processing image");
    return null;
  } finally {
    onProcessingEnd?.();
  }
};

// Extract certificate number from text
export const extractCertificateNumber = (text: string): string | null => {
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

// Validate certificate number
export const validateCertificateNumber = (number: string): boolean => {
  return /^\d{7,}$/.test(number);
};

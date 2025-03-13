
import { toast } from "sonner";
import { createWorker } from 'tesseract.js';
import { subYears, isAfter, isFuture } from 'date-fns';
import { processImageWithOCR } from './ocrUtils';

/**
 * Extract name from OCR text of a medical certificate
 */
export const extractNameFromMedicalCert = (text: string): string | null => {
  // Look for patterns like "NAME: John Doe" or just capitalized words
  const namePatterns = [
    /NAME[\s:]+([\w\s]+)/i,
    /HOLDER[\s:]+([\w\s]+)/i,
    /PILOT[\s:]+([\w\s]+)/i,
    /AIRMAN[\s:]+([\w\s]+)/i,
    /MEDICAL CERTIFICATE[\s:]+.*?NAME[\s:]+([\w\s,]+)/i
  ];
  
  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
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
        return line.trim();
      }
    }
  }
  
  return null;
};

/**
 * Extract date from OCR text of a medical certificate
 */
export const extractDateFromMedicalCert = (text: string): Date | null => {
  // Common date formats, specific to medical certificates
  const datePatterns = [
    // MM/DD/YYYY or MM-DD-YYYY
    /\b(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-](19|20)\d{2}\b/g,
    // Month DD, YYYY
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(0?[1-9]|[12][0-9]|3[01])(st|nd|rd|th)?,\s+(19|20)\d{2}\b/gi,
    // Medical specific patterns
    /EXAM(?:INATION)?\s*DATE[\s:]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i,
    /DATE[\s:]*OF[\s:]*EXAM(?:INATION)?[\s:]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i
  ];
  
  for (const pattern of datePatterns) {
    const matches = text.match(pattern);
    if (matches && matches.length > 0) {
      // Try to parse the matched date
      try {
        // Extract just the date part from the match
        let dateString = matches[0];
        
        // Remove any text before the actual date for patterns like "EXAM DATE: MM/DD/YYYY"
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

/**
 * Validate medical certificate date
 * Date must be within the past 3 years and not in the future
 */
export const validateMedicalDate = (date: Date | null): boolean => {
  if (!date) return false;
  
  const today = new Date();
  const threeYearsAgo = subYears(today, 3);
  
  return !isAfter(threeYearsAgo, date) && !isFuture(date);
};

/**
 * Process medical certificate image with OCR
 */
export const processMedicalCertificate = async (imageData: string): Promise<{
  name: string | null;
  date: Date | null;
  validItems: string[];
}> => {
  try {
    // Process image with OCR
    const worker = await createWorker('eng');
    const result = await worker.recognize(imageData);
    console.log("OCR Result for medical certificate:", result);
    
    // Extract text from the image
    const extractedText = result.data.text;
    
    // Extract name and date
    const name = extractNameFromMedicalCert(extractedText);
    const date = extractDateFromMedicalCert(extractedText);
    
    // Validate the date is within the past 3 years
    let validDate = date;
    if (date) {
      if (!validateMedicalDate(date)) {
        validDate = null;
        toast.error("The examination date must be within the past 3 years and cannot be in the future.");
      }
    }
    
    // Track which items were successfully extracted
    const validItems = [];
    if (name) validItems.push("name");
    if (validDate) validItems.push("examination date");
    
    await worker.terminate();
    
    return {
      name,
      date: validDate,
      validItems
    };
  } catch (error) {
    console.error("OCR processing error:", error);
    throw error;
  }
};

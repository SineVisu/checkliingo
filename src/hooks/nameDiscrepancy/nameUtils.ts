
import { ChecklistGroupData } from '@/components/checklists/ChecklistGroup';
import { compareNames, hasMiddleNameDiscrepancy, hasGeneralNameDiscrepancy } from '@/utils/validation';

/**
 * Extract names from checklist data
 */
export const extractNames = (checklists: ChecklistGroupData[]) => {
  const licenseName = checklists
    .find(group => group.id === '1')?.items
    .find(item => item.id === '101')?.value as string | undefined;
    
  const medicalName = checklists
    .find(group => group.id === '2')?.items
    .find(item => item.id === '201')?.value as string | undefined;
    
  return { licenseName, medicalName };
};

/**
 * Detect various types of name discrepancies
 */
export const detectDiscrepancies = (licenseName: string | undefined, medicalName: string | undefined) => {
  const middleNameDiscrepancyDetected = Boolean(
    licenseName &&
    medicalName &&
    hasMiddleNameDiscrepancy(licenseName, medicalName)
  );
  
  const generalNameDiscrepancyDetected = Boolean(
    licenseName &&
    medicalName &&
    hasGeneralNameDiscrepancy(licenseName, medicalName)
  );
  
  // Any name discrepancy (for backward compatibility)
  const nameDiscrepancyDetected = Boolean(
    licenseName && 
    medicalName && 
    !compareNames(licenseName, medicalName)
  );
  
  return {
    middleNameDiscrepancyDetected,
    generalNameDiscrepancyDetected,
    nameDiscrepancyDetected
  };
};

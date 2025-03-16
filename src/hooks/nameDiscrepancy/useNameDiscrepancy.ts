
import { useState, useEffect } from 'react';
import { UseNameDiscrepancyProps, NameDiscrepancyState } from './types';
import { extractNames, detectDiscrepancies } from './nameUtils';
import { updateNameItemsCompletion, createAcknowledgeHandler } from './discrepancyActions';

export const useNameDiscrepancy = ({ 
  checklists, 
  setChecklists 
}: UseNameDiscrepancyProps): NameDiscrepancyState => {
  const [showNameDiscrepancy, setShowNameDiscrepancy] = useState(false);
  const [showMiddleNameDiscrepancy, setShowMiddleNameDiscrepancy] = useState(false);
  
  // Extract names from checklists
  const { licenseName, medicalName } = extractNames(checklists);
  
  // Check for different types of name discrepancies
  const { 
    middleNameDiscrepancyDetected,
    generalNameDiscrepancyDetected,
    nameDiscrepancyDetected 
  } = detectDiscrepancies(licenseName, medicalName);

  // Check name discrepancy whenever names change
  const checkNameDiscrepancy = () => {
    if (licenseName && medicalName) {
      // First check for middle name discrepancy
      if (middleNameDiscrepancyDetected) {
        // Middle name detected, show the middle name dialog
        setShowMiddleNameDiscrepancy(true);
        setShowNameDiscrepancy(false);
        
        // Mark both items as incomplete
        updateNameItemsCompletion(checklists, setChecklists, false);
      }
      // Then check for general name discrepancy if no middle name issue
      else if (generalNameDiscrepancyDetected) {
        // We have a general discrepancy, show the dialog
        setShowNameDiscrepancy(true);
        setShowMiddleNameDiscrepancy(false);
        
        // Also mark both items as incomplete
        updateNameItemsCompletion(checklists, setChecklists, false);
      } else {
        // Names match, ensure both are marked complete
        updateNameItemsCompletion(checklists, setChecklists, true);
      }
    }
  };

  // Functions to acknowledge discrepancies
  const acknowledgeNameDiscrepancy = createAcknowledgeHandler(
    setChecklists,
    setShowNameDiscrepancy
  );
  
  const acknowledgeMiddleNameDiscrepancy = createAcknowledgeHandler(
    setChecklists,
    setShowMiddleNameDiscrepancy
  );

  // Check discrepancy whenever names change
  useEffect(() => {
    checkNameDiscrepancy();
  }, [licenseName, medicalName]);

  return {
    licenseName,
    medicalName,
    nameDiscrepancyDetected,
    middleNameDiscrepancyDetected,
    generalNameDiscrepancyDetected,
    showNameDiscrepancy,
    showMiddleNameDiscrepancy,
    setShowNameDiscrepancy,
    setShowMiddleNameDiscrepancy,
    checkNameDiscrepancy,
    acknowledgeNameDiscrepancy,
    acknowledgeMiddleNameDiscrepancy,
  };
};

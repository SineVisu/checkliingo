
import { useState, useEffect } from 'react';
import { compareNames, hasMiddleNameDiscrepancy, hasGeneralNameDiscrepancy } from '@/utils/validation';
import { ChecklistGroupData } from '@/components/checklists/ChecklistGroup';

interface UseNameDiscrepancyProps {
  checklists: ChecklistGroupData[];
  setChecklists: React.Dispatch<React.SetStateAction<ChecklistGroupData[]>>;
}

interface NameDiscrepancyState {
  licenseName: string | undefined;
  medicalName: string | undefined;
  nameDiscrepancyDetected: boolean;
  middleNameDiscrepancyDetected: boolean;
  generalNameDiscrepancyDetected: boolean;
  showNameDiscrepancy: boolean;
  showMiddleNameDiscrepancy: boolean;
  setShowNameDiscrepancy: (show: boolean) => void;
  setShowMiddleNameDiscrepancy: (show: boolean) => void;
  checkNameDiscrepancy: () => void;
  acknowledgeNameDiscrepancy: () => void;
  acknowledgeMiddleNameDiscrepancy: () => void;
}

export const useNameDiscrepancy = ({ 
  checklists, 
  setChecklists 
}: UseNameDiscrepancyProps): NameDiscrepancyState => {
  const [showNameDiscrepancy, setShowNameDiscrepancy] = useState(false);
  const [showMiddleNameDiscrepancy, setShowMiddleNameDiscrepancy] = useState(false);
  
  // Extract names from checklists
  const licenseName = checklists
    .find(group => group.id === '1')?.items
    .find(item => item.id === '101')?.value as string | undefined;
    
  const medicalName = checklists
    .find(group => group.id === '2')?.items
    .find(item => item.id === '201')?.value as string | undefined;
  
  // Check for different types of name discrepancies
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

  // Check name discrepancy whenever names change
  const checkNameDiscrepancy = () => {
    if (licenseName && medicalName) {
      // First check for middle name discrepancy
      if (hasMiddleNameDiscrepancy(licenseName, medicalName)) {
        // Middle name detected, show the middle name dialog
        setShowMiddleNameDiscrepancy(true);
        setShowNameDiscrepancy(false);
        
        // Mark both items as incomplete
        setChecklists(prevChecklists => 
          prevChecklists.map(group => {
            if (group.id === '1') {
              return {
                ...group,
                items: group.items.map(item => 
                  item.id === '101' ? { ...item, isCompleted: false } : item
                )
              };
            }
            else if (group.id === '2') {
              return {
                ...group,
                items: group.items.map(item => 
                  item.id === '201' ? { ...item, isCompleted: false } : item
                )
              };
            }
            return group;
          })
        );
      }
      // Then check for general name discrepancy if no middle name issue
      else if (hasGeneralNameDiscrepancy(licenseName, medicalName)) {
        // We have a general discrepancy, show the dialog
        setShowNameDiscrepancy(true);
        setShowMiddleNameDiscrepancy(false);
        
        // Also mark both items as incomplete
        setChecklists(prevChecklists => 
          prevChecklists.map(group => {
            if (group.id === '1') {
              return {
                ...group,
                items: group.items.map(item => 
                  item.id === '101' ? { ...item, isCompleted: false } : item
                )
              };
            }
            else if (group.id === '2') {
              return {
                ...group,
                items: group.items.map(item => 
                  item.id === '201' ? { ...item, isCompleted: false } : item
                )
              };
            }
            return group;
          })
        );
      } else {
        // Names match, ensure both are marked complete
        setChecklists(prevChecklists => 
          prevChecklists.map(group => {
            if (group.id === '1') {
              return {
                ...group,
                items: group.items.map(item => 
                  item.id === '101' ? { ...item, isCompleted: true } : item
                )
              };
            }
            else if (group.id === '2') {
              return {
                ...group,
                items: group.items.map(item => 
                  item.id === '201' ? { ...item, isCompleted: true } : item
                )
              };
            }
            return group;
          })
        );
      }
    }
  };

  // Functions to acknowledge discrepancies
  const acknowledgeNameDiscrepancy = () => {
    // Mark both name items as complete despite the discrepancy
    setChecklists(prevChecklists => 
      prevChecklists.map(group => {
        if (group.id === '1') {
          return {
            ...group,
            items: group.items.map(item => 
              item.id === '101' ? { ...item, isCompleted: true } : item
            )
          };
        }
        else if (group.id === '2') {
          return {
            ...group,
            items: group.items.map(item => 
              item.id === '201' ? { ...item, isCompleted: true } : item
            )
          };
        }
        return group;
      })
    );
    
    // Close the dialog
    setShowNameDiscrepancy(false);
  };
  
  const acknowledgeMiddleNameDiscrepancy = () => {
    // Mark both name items as complete despite the discrepancy
    setChecklists(prevChecklists => 
      prevChecklists.map(group => {
        if (group.id === '1') {
          return {
            ...group,
            items: group.items.map(item => 
              item.id === '101' ? { ...item, isCompleted: true } : item
            )
          };
        }
        else if (group.id === '2') {
          return {
            ...group,
            items: group.items.map(item => 
              item.id === '201' ? { ...item, isCompleted: true } : item
            )
          };
        }
        return group;
      })
    );
    
    // Close the dialog
    setShowMiddleNameDiscrepancy(false);
  };

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

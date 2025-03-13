
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { compareNames, hasMiddleNameDiscrepancy } from '@/utils/validation';
import { ChecklistGroupData } from '@/components/checklists/ChecklistGroup';

interface ChecklistContextType {
  checklists: ChecklistGroupData[];
  setChecklists: React.Dispatch<React.SetStateAction<ChecklistGroupData[]>>;
  licenseName: string | undefined;
  medicalName: string | undefined;
  nameDiscrepancyDetected: boolean;
  middleNameDiscrepancyDetected: boolean;
  showNameDiscrepancy: boolean;
  showMiddleNameDiscrepancy: boolean;
  setShowNameDiscrepancy: (show: boolean) => void;
  setShowMiddleNameDiscrepancy: (show: boolean) => void;
  checkNameDiscrepancy: () => void;
  acknowledgeNameDiscrepancy: () => void;
  acknowledgeMiddleNameDiscrepancy: () => void;
}

export const ChecklistContext = createContext<ChecklistContextType>({
  checklists: [],
  setChecklists: () => {},
  licenseName: undefined,
  medicalName: undefined,
  nameDiscrepancyDetected: false,
  middleNameDiscrepancyDetected: false,
  showNameDiscrepancy: false,
  showMiddleNameDiscrepancy: false,
  setShowNameDiscrepancy: () => {},
  setShowMiddleNameDiscrepancy: () => {},
  checkNameDiscrepancy: () => {},
  acknowledgeNameDiscrepancy: () => {},
  acknowledgeMiddleNameDiscrepancy: () => {},
});

interface ChecklistProviderProps {
  children: ReactNode;
  initialData: ChecklistGroupData[];
}

export const ChecklistProvider: React.FC<ChecklistProviderProps> = ({ 
  children, 
  initialData 
}) => {
  const [checklists, setChecklists] = useState<ChecklistGroupData[]>(initialData);
  const [showNameDiscrepancy, setShowNameDiscrepancy] = useState(false);
  const [showMiddleNameDiscrepancy, setShowMiddleNameDiscrepancy] = useState(false);
  
  // Extract names from checklists
  const licenseName = checklists
    .find(group => group.id === '1')?.items
    .find(item => item.id === '101')?.value as string | undefined;
    
  const medicalName = checklists
    .find(group => group.id === '2')?.items
    .find(item => item.id === '201')?.value as string | undefined;
  
  // Check if names match or if there's a middle name discrepancy
  const nameDiscrepancyDetected = Boolean(
    licenseName && 
    medicalName && 
    !compareNames(licenseName, medicalName)
  );
  
  const middleNameDiscrepancyDetected = Boolean(
    licenseName &&
    medicalName &&
    hasMiddleNameDiscrepancy(licenseName, medicalName)
  );

  // This function will be called when either name changes
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
      else if (!compareNames(licenseName, medicalName)) {
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

  // Function to acknowledge the name discrepancy and mark tasks as complete
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
  
  // Function to acknowledge the middle name discrepancy and mark tasks as complete
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

  const value = {
    checklists,
    setChecklists,
    licenseName,
    medicalName,
    nameDiscrepancyDetected,
    middleNameDiscrepancyDetected,
    showNameDiscrepancy,
    showMiddleNameDiscrepancy,
    setShowNameDiscrepancy,
    setShowMiddleNameDiscrepancy,
    checkNameDiscrepancy,
    acknowledgeNameDiscrepancy,
    acknowledgeMiddleNameDiscrepancy,
  };

  return (
    <ChecklistContext.Provider value={value}>
      {children}
    </ChecklistContext.Provider>
  );
};


import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { compareNames } from '@/utils/validation';
import { ChecklistGroupData } from '@/components/checklists/ChecklistGroup';

interface ChecklistContextType {
  checklists: ChecklistGroupData[];
  setChecklists: React.Dispatch<React.SetStateAction<ChecklistGroupData[]>>;
  licenseName: string | undefined;
  medicalName: string | undefined;
  nameDiscrepancyDetected: boolean;
  showNameDiscrepancy: boolean;
  setShowNameDiscrepancy: (show: boolean) => void;
  checkNameDiscrepancy: () => void;
  acknowledgeNameDiscrepancy: () => void;
}

export const ChecklistContext = createContext<ChecklistContextType>({
  checklists: [],
  setChecklists: () => {},
  licenseName: undefined,
  medicalName: undefined,
  nameDiscrepancyDetected: false,
  showNameDiscrepancy: false,
  setShowNameDiscrepancy: () => {},
  checkNameDiscrepancy: () => {},
  acknowledgeNameDiscrepancy: () => {},
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
  
  // Extract names from checklists
  const licenseName = checklists
    .find(group => group.id === '1')?.items
    .find(item => item.id === '101')?.value as string | undefined;
    
  const medicalName = checklists
    .find(group => group.id === '2')?.items
    .find(item => item.id === '201')?.value as string | undefined;
  
  // Check if names match
  const nameDiscrepancyDetected = Boolean(
    licenseName && 
    medicalName && 
    !compareNames(licenseName, medicalName)
  );

  // This function will be called when either name changes
  const checkNameDiscrepancy = () => {
    if (licenseName && medicalName) {
      // Both names are present, check for discrepancy
      if (!compareNames(licenseName, medicalName)) {
        // We have a discrepancy, show the dialog
        setShowNameDiscrepancy(true);
        
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
    showNameDiscrepancy,
    setShowNameDiscrepancy,
    checkNameDiscrepancy,
    acknowledgeNameDiscrepancy,
  };

  return (
    <ChecklistContext.Provider value={value}>
      {children}
    </ChecklistContext.Provider>
  );
};

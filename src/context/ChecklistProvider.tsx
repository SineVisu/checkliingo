
import React, { useState, ReactNode } from 'react';
import { ChecklistContext } from './ChecklistContext';
import { useNameDiscrepancy } from '@/hooks/useNameDiscrepancy';
import { ChecklistGroupData } from '@/components/checklists/ChecklistGroup';

interface ChecklistProviderProps {
  children: ReactNode;
  initialData: ChecklistGroupData[];
}

export const ChecklistProvider: React.FC<ChecklistProviderProps> = ({ 
  children, 
  initialData 
}) => {
  const [checklists, setChecklists] = useState<ChecklistGroupData[]>(initialData);
  
  const nameDiscrepancyState = useNameDiscrepancy({ 
    checklists, 
    setChecklists 
  });
  
  const value = {
    checklists,
    setChecklists,
    ...nameDiscrepancyState
  };

  return (
    <ChecklistContext.Provider value={value}>
      {children}
    </ChecklistContext.Provider>
  );
};


import React, { useState, ReactNode, useEffect } from 'react';
import { ChecklistContext } from './ChecklistContext';
import { useNameDiscrepancy } from '@/hooks/nameDiscrepancy/useNameDiscrepancy';
import { ChecklistGroupData } from '@/components/checklists/ChecklistGroup';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChecklistProviderProps {
  children: ReactNode;
  initialData: ChecklistGroupData[];
}

export const ChecklistProvider: React.FC<ChecklistProviderProps> = ({ 
  children, 
  initialData 
}) => {
  const [checklists, setChecklists] = useState<ChecklistGroupData[]>(initialData);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const nameDiscrepancyState = useNameDiscrepancy({ 
    checklists, 
    setChecklists 
  });
  
  // Apply mobile-specific optimizations
  useEffect(() => {
    if (isMobile) {
      // Any mobile-specific initializations can go here
      console.log('Running in mobile mode');
    }
  }, [isMobile]);
  
  const value = {
    checklists,
    setChecklists,
    filterCategory,
    setFilterCategory,
    isMobile,
    ...nameDiscrepancyState
  };

  return (
    <ChecklistContext.Provider value={value}>
      {children}
    </ChecklistContext.Provider>
  );
};


import React, { useState, ReactNode, useEffect, useCallback } from 'react';
import { ChecklistContext } from './ChecklistContext';
import { useNameDiscrepancy } from '@/hooks/useNameDiscrepancy';
import { ChecklistGroupData } from '@/components/checklists/ChecklistGroup';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

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
  
  // Save checklist data function
  const saveChecklistData = useCallback(() => {
    try {
      localStorage.setItem('flyber-checklists', JSON.stringify(checklists));
      toast.success("Checklist saved", {
        description: "Your progress has been saved successfully."
      });
    } catch (error) {
      console.error("Error saving checklist data:", error);
      toast.error("Failed to save", {
        description: "There was a problem saving your checklist data."
      });
    }
  }, [checklists]);
  
  const value = {
    checklists,
    setChecklists,
    filterCategory,
    setFilterCategory,
    isMobile,
    saveChecklistData,
    ...nameDiscrepancyState
  };

  return (
    <ChecklistContext.Provider value={value}>
      {children}
    </ChecklistContext.Provider>
  );
};

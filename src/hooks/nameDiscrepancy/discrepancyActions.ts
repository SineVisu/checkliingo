
import { ChecklistGroupData } from '@/components/checklists/ChecklistGroup';

/**
 * Update checklist items completion status based on name matching
 */
export const updateNameItemsCompletion = (
  checklists: ChecklistGroupData[],
  setChecklists: React.Dispatch<React.SetStateAction<ChecklistGroupData[]>>,
  isCompleted: boolean
) => {
  setChecklists(prevChecklists => 
    prevChecklists.map(group => {
      if (group.id === '1') {
        return {
          ...group,
          items: group.items.map(item => 
            item.id === '101' ? { ...item, isCompleted } : item
          )
        };
      }
      else if (group.id === '2') {
        return {
          ...group,
          items: group.items.map(item => 
            item.id === '201' ? { ...item, isCompleted } : item
          )
        };
      }
      return group;
    })
  );
};

/**
 * Handle acknowledgement of name discrepancies
 */
export const createAcknowledgeHandler = (
  setChecklists: React.Dispatch<React.SetStateAction<ChecklistGroupData[]>>,
  setShowDialog: (show: boolean) => void
) => {
  return () => {
    // Mark both name items as complete despite the discrepancy
    updateNameItemsCompletion([], setChecklists, true);
    
    // Close the dialog
    setShowDialog(false);
  };
};

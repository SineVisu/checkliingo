
import { ChecklistItemData } from '@/components/checklists/ChecklistItem';

// Helper function to get the initial value for dialog
export const getInitialValueWithParent = (item: ChecklistItemData) => {
  let initialValueWithParent = item.value;
  
  // Check if it's a Flight or Ground task
  if (item.title === 'Flight' || item.title === 'Ground') {
    // Start with an empty object if value isn't an object
    const baseObject = typeof item.value === 'object' && item.value !== null && !(item.value instanceof Date)
      ? { ...item.value as object } 
      : {};
    
    // Find the parent task title
    let parentTaskTitle = null;
    if (item.id.includes('-')) {
      const parentId = item.id.split('-')[0];
      const parentTaskElements = document.querySelectorAll(`[data-task-id="${parentId}"]`);
      if (parentTaskElements.length > 0) {
        const element = parentTaskElements[0];
        parentTaskTitle = element.textContent?.trim() || null;
      }
    }
    
    initialValueWithParent = {
      ...baseObject,
      parentTaskTitle: parentTaskTitle
    };
  }
  
  // Handle Aeronautical Knowledge tasks
  if (item.id.startsWith('5') && !item.id.includes('-')) {
    const baseObject = typeof item.value === 'object' && item.value !== null && !(item.value instanceof Date)
      ? { ...item.value as object } 
      : {};
    
    initialValueWithParent = {
      ...baseObject,
      parentTaskTitle: item.title
    };
  }
  
  // Special case for Knowledge Test Results to preserve score and date
  if (item.id === '515' && typeof item.value === 'object' && item.value !== null) {
    // Create a new object with the correct type
    const testResults = {
      score: (item.value as any).score,
      date: (item.value as any).date
    };
    
    initialValueWithParent = testResults;
  }

  return initialValueWithParent;
};

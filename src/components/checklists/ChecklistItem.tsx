
import React from 'react';
import { toast } from 'sonner';
import { ChecklistContext } from '@/context/ChecklistContext';
import ChecklistItemActions from './ChecklistItemActions';
import ChecklistItemContent from './ChecklistItemContent';
import DialogSelector from './DialogSelector';
import { useSubtaskHandling } from '@/hooks/useSubtaskHandling';
import { useChecklistItemState } from '@/hooks/useChecklistItemState';

export interface ChecklistItemData {
  id: string;
  title: string;
  isCompleted: boolean;
  category?: string;
  value?: string | Date | { date?: Date; hours?: string; pageNumber?: string; parentTaskTitle?: string };
  subtasks?: ChecklistItemData[];
}

interface ChecklistItemProps {
  item: ChecklistItemData;
  onToggleComplete: (id: string, completed: boolean, value?: string | Date | { date?: Date; hours?: string; pageNumber?: string; parentTaskTitle?: string }) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, onToggleComplete }) => {
  const { dialogOpen, setDialogOpen, expandedSubtasks, setExpandedSubtasks, animating, setAnimating } = useChecklistItemState();
  
  // Handle subtasks expansion and completion
  const { handleToggle, areAllSubtasksCompleted } = useSubtaskHandling({
    item,
    onToggleComplete,
    setAnimating,
    setExpandedSubtasks,
    expandedSubtasks,
    setDialogOpen
  });

  // Get initial value for the dialog
  const initialValueWithParent = getInitialValueWithParent(item);

  // Check if item is an Aeronautical Knowledge task (in group 5)
  const isKnowledgeTask = item.id.startsWith('5') && !item.id.includes('-');
  // Check if item is an Aeronautical Experience task (in group 6)
  const isExperienceTask = item.id.startsWith('6') && !item.id.includes('-');

  // Dialog callbacks
  const { handleSaveLicenseName, handleSaveIssuanceDate, handleSaveCertificateNumber, 
          handleSaveFTN, handleSavePreflight } = useDialogCallbacks(item, onToggleComplete);

  return (
    <>
      <div 
        className={`bg-white rounded-xl p-4 mb-3 task-shadow flex items-center animate-scale transition-all duration-300 ${
          animating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}
        data-task-id={item.id}
      >
        <ChecklistItemContent 
          item={item}
          handleToggle={handleToggle}
          expandedSubtasks={expandedSubtasks}
          setExpandedSubtasks={setExpandedSubtasks}
          areAllSubtasksCompleted={areAllSubtasksCompleted}
        />
        
        <ChecklistItemActions />
      </div>

      {/* Render subtasks if expanded */}
      {expandedSubtasks && item.subtasks && item.subtasks.length > 0 && (
        <div className="pl-8 space-y-2 mb-3">
          {item.subtasks.map(subtask => (
            <ChecklistItem 
              key={subtask.id} 
              item={subtask} 
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      )}

      <DialogSelector 
        itemTitle={item.title}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSaveLicenseName={handleSaveLicenseName}
        onSaveIssuanceDate={handleSaveIssuanceDate}
        onSaveCertificateNumber={handleSaveCertificateNumber}
        onSaveFTN={handleSaveFTN}
        onSavePreflight={handleSavePreflight}
        initialValue={initialValueWithParent}
      />
    </>
  );
};

// Helper function to get the initial value for dialog
const getInitialValueWithParent = (item: ChecklistItemData) => {
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
  
  // Handle Aeronautical Experience tasks
  if (item.id.startsWith('6') && !item.id.includes('-')) {
    const baseObject = typeof item.value === 'object' && item.value !== null && !(item.value instanceof Date)
      ? { ...item.value as object } 
      : {};
    
    initialValueWithParent = {
      ...baseObject,
      parentTaskTitle: item.title
    };
  }

  return initialValueWithParent;
};

// Extract dialog callbacks into a custom hook
const useDialogCallbacks = (item: ChecklistItemData, onToggleComplete: ChecklistItemProps['onToggleComplete']) => {
  const { checkNameDiscrepancy } = React.useContext(ChecklistContext);
  
  // Check if item is a Flight Proficiency task (in group 4)
  const isFlightProficiencyTask = item.id.startsWith('4') && !item.id.includes('-');
  // Check if item is an Aeronautical Knowledge task (in group 5)
  const isKnowledgeTask = item.id.startsWith('5');
  // Check if item is an Aeronautical Experience task (in group 6)
  const isExperienceTask = item.id.startsWith('6');

  const handleSaveLicenseName = (name: string) => {
    toast.success(`Certificate name saved: ${name}`);
    onToggleComplete(item.id, true, name);
    
    // After setting the name, check for discrepancies
    if (item.title === 'Name as it appears on Certificate' || item.title === 'Name as it appears on Medical') {
      checkNameDiscrepancy();
    }
  };
  
  const handleSaveIssuanceDate = (date: Date) => {
    toast.success(`Date of issuance saved: ${format(date, 'MMMM d, yyyy')}`);
    onToggleComplete(item.id, true, date);
  };

  const handleSaveCertificateNumber = (number: string) => {
    toast.success(`Certificate number saved: ${number}`);
    onToggleComplete(item.id, true, number);
  };

  const handleSaveFTN = (ftn: string) => {
    toast.success(`FTN# saved: ${ftn}`);
    onToggleComplete(item.id, true, ftn);
  };

  const handleSavePreflight = (data: { date: Date; hours: string; pageNumber?: string }) => {
    let successMessage = '';
    
    if (isExperienceTask) {
      const pageInfo = data.pageNumber ? ` - Logbook Page: ${data.pageNumber}` : '';
      successMessage = `${item.title} details saved: ${format(data.date, 'MMMM d, yyyy')} - ${data.hours} hours${pageInfo}`;
    } else {
      const pageInfo = data.pageNumber ? ` - Page: ${data.pageNumber}` : '';
      successMessage = `${item.title} details saved: ${format(data.date, 'MMMM d, yyyy')} - ${data.hours} hours${pageInfo}`;
    }
    
    toast.success(successMessage);
    
    // Add parent task title to the data for displaying in dialog title
    const parentItem = isFlightProficiencyTask ? item : null;
    const knowledgeParentTitle = isKnowledgeTask ? item.title : null;
    const experienceParentTitle = isExperienceTask ? item.title : null;
    
    const completeData = {
      ...data,
      parentTaskTitle: experienceParentTitle || knowledgeParentTitle || (parentItem?.title || null)
    };
    
    onToggleComplete(item.id, true, completeData);
  };

  return {
    handleSaveLicenseName,
    handleSaveIssuanceDate,
    handleSaveCertificateNumber,
    handleSaveFTN,
    handleSavePreflight
  };
};

// Import needed for format function in useDialogCallbacks
import { format } from 'date-fns';

export default ChecklistItem;


import React from 'react';
import { ChecklistContext } from '@/context/ChecklistContext';
import ChecklistItemActions from './ChecklistItemActions';
import ChecklistItemContent from './ChecklistItemContent';
import DialogSelector from './DialogSelector';
import { useSubtaskHandling } from '@/hooks/useSubtaskHandling';
import { useChecklistItemState } from '@/hooks/useChecklistItemState';
import { useDialogCallbacks } from '@/hooks/useDialogCallbacks';
import { getInitialValueWithParent } from '@/utils/dialogUtils';

export interface ChecklistItemData {
  id: string;
  title: string;
  isCompleted: boolean;
  category?: string;
  value?: string | Date | { date?: Date; hours?: string; pageNumber?: string; parentTaskTitle?: string; score?: string; pltCodes?: string[] };
  subtasks?: ChecklistItemData[];
}

interface ChecklistItemProps {
  item: ChecklistItemData;
  onToggleComplete: (id: string, completed: boolean, value?: string | Date | { date?: Date; hours?: string; pageNumber?: string; parentTaskTitle?: string; score?: string; pltCodes?: string[] }) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, onToggleComplete }) => {
  const { dialogOpen, setDialogOpen, expandedSubtasks, setExpandedSubtasks, animating, setAnimating } = useChecklistItemState();
  
  const { handleToggle, areAllSubtasksCompleted, hasSubtaskWithInputData } = useSubtaskHandling({
    item,
    onToggleComplete,
    setAnimating,
    setExpandedSubtasks,
    expandedSubtasks,
    setDialogOpen
  });

  const initialValueWithParent = getInitialValueWithParent(item);

  const dialogCallbacks = useDialogCallbacks({ item, onToggleComplete });

  // Check if this is a flight proficiency task (in group 4)
  const isFlightProficiencyTask = item.id.startsWith('4') && !item.id.includes('-');
  
  // Determine if the item should appear visually completed 
  // For all items with subtasks, they should only appear completed if ALL subtasks are completed
  // OR if the item itself is marked as completed
  const isVisuallyCompleted = item.isCompleted || 
    (item.subtasks && item.subtasks.length > 0 && areAllSubtasksCompleted());

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
          hasSubtaskWithInputData={hasSubtaskWithInputData}
          isVisuallyCompleted={isVisuallyCompleted}
        />
        
        <ChecklistItemActions />
      </div>

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
        onSaveLicenseName={dialogCallbacks.handleSaveLicenseName}
        onSaveIssuanceDate={dialogCallbacks.handleSaveIssuanceDate}
        onSaveCertificateNumber={dialogCallbacks.handleSaveCertificateNumber}
        onSaveFTN={dialogCallbacks.handleSaveFTN}
        onSavePreflight={dialogCallbacks.handleSavePreflight}
        onSaveLogbookPage={dialogCallbacks.handleSaveLogbookPage}
        onSaveKnowledgeTestResults={dialogCallbacks.handleSaveKnowledgeTestResults}
        initialValue={initialValueWithParent}
        category={item.category}
      />
    </>
  );
};

export default ChecklistItem;

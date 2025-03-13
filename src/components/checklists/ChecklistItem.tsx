
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

  // Dialog callbacks
  const dialogCallbacks = useDialogCallbacks({ item, onToggleComplete });

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

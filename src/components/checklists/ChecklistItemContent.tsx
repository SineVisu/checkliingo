
import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import ValueDisplay from './ValueDisplay';
import CategoryLabel from './CategoryLabel';
import { ChecklistItemData } from './ChecklistItem';

interface ChecklistItemContentProps {
  item: ChecklistItemData;
  handleToggle: () => void;
  expandedSubtasks: boolean;
  setExpandedSubtasks: React.Dispatch<React.SetStateAction<boolean>>;
  areAllSubtasksCompleted: () => boolean;
  hasSubtaskWithInputData?: () => boolean;
  isVisuallyCompleted?: boolean;
}

const ChecklistItemContent: React.FC<ChecklistItemContentProps> = ({
  item,
  handleToggle,
  expandedSubtasks,
  setExpandedSubtasks,
  areAllSubtasksCompleted,
  hasSubtaskWithInputData,
  isVisuallyCompleted
}) => {
  // If isVisuallyCompleted is provided, use it; otherwise fall back to checking subtasks or item.isCompleted
  // For individual items without subtasks, they are completed if isCompleted is true
  // For items with subtasks, they are completed if all subtasks are completed OR the parent is directly marked complete
  const isCompleted = isVisuallyCompleted !== undefined 
    ? isVisuallyCompleted 
    : (item.subtasks && item.subtasks.length > 0 
        ? areAllSubtasksCompleted() 
        : item.isCompleted);

  return (
    <div className="flex-1 flex items-center">
      <button 
        onClick={handleToggle} 
        className={`checkbox-container mr-3 ${isCompleted ? 'checked' : ''}`}
      >
        <div className={`checkbox-circle ${isCompleted ? 'border-success' : 'border-gray-300'}`}>
          <Check className="h-3 w-3 text-white checkbox-icon" />
        </div>
      </button>
      
      <div className="flex-1">
        <div className="flex items-center">
          <p className={`font-medium transition-all duration-300 ${
            isCompleted ? 'text-gray-800' : 'text-gray-800'
          }`}>
            {item.title}
          </p>
          
          {item.subtasks && item.subtasks.length > 0 && (
            <button 
              onClick={() => setExpandedSubtasks(!expandedSubtasks)}
              className="ml-2 text-gray-400 hover:text-gray-600 transition-all"
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${expandedSubtasks ? 'rotate-90' : ''}`} />
            </button>
          )}
        </div>
        
        {item.value && (
          <p className="text-xs text-gray-500 mt-1">
            <ValueDisplay value={item.value} itemTitle={item.title} />
          </p>
        )}
        
        <CategoryLabel category={item.category} />
      </div>
    </div>
  );
};

export default ChecklistItemContent;

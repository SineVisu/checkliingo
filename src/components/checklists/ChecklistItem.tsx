
import React, { useState, useContext, useEffect } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ChecklistContext } from '@/context/ChecklistContext';
import ValueDisplay from './ValueDisplay';
import DialogSelector from './DialogSelector';
import CategoryLabel from './CategoryLabel';
import ChecklistItemActions from './ChecklistItemActions';

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
  const [animating, setAnimating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expandedSubtasks, setExpandedSubtasks] = useState(false);
  const { checkNameDiscrepancy } = useContext(ChecklistContext);

  // Check if item is a Flight Proficiency task (in group 4)
  const isFlightProficiencyTask = item.id.startsWith('4') && !item.id.includes('-');

  const handleToggle = () => {
    // If the item has subtasks, toggle expansion instead of completing
    if (item.subtasks && item.subtasks.length > 0) {
      setExpandedSubtasks(!expandedSubtasks);
      return;
    }

    if (['Name as it appears on Certificate', 'Name as it appears on Medical', 
         'Date of Issuance', 'Certificate Number', 'FTN# (FAA Tracking Number)',
         'Flight', 'Ground'].includes(item.title)) {
      setDialogOpen(true);
      return;
    }

    // For flight proficiency tasks, don't allow direct completion
    if (isFlightProficiencyTask) {
      toast.warning(`Complete both Flight and Ground subtasks first`, {
        description: "Both Flight and Ground subtasks must be completed first",
      });
      setExpandedSubtasks(true);
      return;
    }

    setAnimating(true);
    setTimeout(() => {
      onToggleComplete(item.id, !item.isCompleted);
      setAnimating(false);
    }, 300);
  };

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
    const pageInfo = data.pageNumber ? ` - Page: ${data.pageNumber}` : '';
    toast.success(`${item.title} details saved: ${format(data.date, 'MMMM d, yyyy')} - ${data.hours} hours${pageInfo}`);
    
    // Add parent task title to the data for displaying in dialog title
    const parentItem = isFlightProficiencyTask ? item : null;
    const completeData = {
      ...data,
      parentTaskTitle: parentItem?.title
    };
    
    onToggleComplete(item.id, true, completeData);
  };

  // Check if all subtasks are completed
  const areAllSubtasksCompleted = () => {
    if (!item.subtasks || item.subtasks.length === 0) return false;
    return item.subtasks.every(subtask => subtask.isCompleted);
  };

  // Update main task status when all subtasks are completed
  useEffect(() => {
    if (item.subtasks && areAllSubtasksCompleted() && !item.isCompleted) {
      // Only automatically complete for flight proficiency tasks
      if (isFlightProficiencyTask) {
        onToggleComplete(item.id, true);
        toast.success(`${item.title} completed!`, {
          description: "Both Flight and Ground subtasks are now complete.",
        });
      }
    }
  }, [item.subtasks, item.isCompleted]);

  // If this is a subtask of a Flight Proficiency task, pass the parent task title
  let initialValueWithParent = item.value;

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

  return (
    <>
      <div 
        className={`bg-white rounded-xl p-4 mb-3 task-shadow flex items-center animate-scale transition-all duration-300 ${
          animating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}
        data-task-id={item.id}
      >
        <div className="flex-1 flex items-center">
          <button 
            onClick={handleToggle} 
            className={`checkbox-container mr-3 ${
              item.subtasks && item.subtasks.length > 0 
                ? areAllSubtasksCompleted() ? 'checked' : '' 
                : item.isCompleted ? 'checked' : ''
            }`}
          >
            <div className={`checkbox-circle ${
              item.subtasks && item.subtasks.length > 0 
                ? areAllSubtasksCompleted() ? 'border-success' : 'border-gray-300' 
                : item.isCompleted ? 'border-success' : 'border-gray-300'
            }`}>
              <Check className="h-3 w-3 text-white checkbox-icon" />
            </div>
          </button>
          
          <div className="flex-1">
            <div className="flex items-center">
              <p className={`font-medium transition-all duration-300 ${
                item.isCompleted ? 'text-gray-800' : 'text-gray-800'
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
                <ValueDisplay value={item.value} />
              </p>
            )}
            
            <CategoryLabel category={item.category} />
          </div>
        </div>
        
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

export default ChecklistItem;

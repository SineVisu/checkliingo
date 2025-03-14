
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ChecklistItemData } from '@/components/checklists/ChecklistItem';

interface SubtaskHandlingProps {
  item: ChecklistItemData;
  onToggleComplete: (id: string, completed: boolean, value?: any) => void;
  setAnimating: (value: boolean) => void;
  setExpandedSubtasks: (value: boolean) => void;
  expandedSubtasks: boolean;
  setDialogOpen: (value: boolean) => void;
}

export const useSubtaskHandling = ({
  item,
  onToggleComplete,
  setAnimating,
  setExpandedSubtasks,
  expandedSubtasks,
  setDialogOpen
}: SubtaskHandlingProps) => {
  // Check if item is a Flight Proficiency task (in group 4)
  const isFlightProficiencyTask = item.id.startsWith('4') && !item.id.includes('-');
  
  // Check if item is an Aeronautical Knowledge task (in group 5)
  const isKnowledgeTask = item.id.startsWith('5') && !item.id.includes('-');

  // Check if it's the Applicable FAR's task
  const isApplicableFARsTask = item.id === '600';

  // Check if it's the NTSB Accident Reporting task
  const isNTSBAccidentTask = item.id === '601';

  // Check if it's the AIM Advisory Circulars task
  const isAIMAdvisoryCircularsTask = item.id === '602';
  
  // Check if it's the VFR Navigation Charts task
  const isVFRNavigationChartsTask = item.id === '603';

  // Check if item is an Aeronautical Experience task (category experience)
  const isExperienceTask = item.category === 'experience';

  const handleToggle = () => {
    // If the item has subtasks, toggle expansion instead of completing
    if (item.subtasks && item.subtasks.length > 0) {
      setExpandedSubtasks(!expandedSubtasks);
      return;
    }

    if (['Name as it appears on Certificate', 'Name as it appears on Medical', 
         'Date of Issuance', 'Certificate Number', 'FTN# (FAA Tracking Number)',
         'Flight', 'Ground', '(2) Accident reporting requirements of the NTSB',
         '(3) Use of the applicable portions of the AIM and FAA advisory circulars',
         '(4) Use of charts for VFR navigation, using pilotage, dead reckoning, and navigation systems'].includes(item.title)) {
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

    // For knowledge tasks, allow direct completion but show dialog for entering data
    if (isKnowledgeTask || isApplicableFARsTask || isNTSBAccidentTask || isAIMAdvisoryCircularsTask || isVFRNavigationChartsTask) {
      setDialogOpen(true);
      return;
    }

    // For experience tasks, open the dialog for logbook page entry
    if (isExperienceTask) {
      setDialogOpen(true);
      return;
    }

    setAnimating(true);
    setTimeout(() => {
      onToggleComplete(item.id, !item.isCompleted);
      setAnimating(false);
    }, 300);
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

  return {
    handleToggle,
    areAllSubtasksCompleted
  };
};

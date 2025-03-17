
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
  
  // Check if it's the Radio Communication Procedures task
  const isRadioCommunicationProceduresTask = item.id === '604';
  
  // Check if it's the Critical Weather Situations task
  const isCriticalWeatherSituationsTask = item.id === '605';
  
  // Check if it's the Safe Operation Aircraft task
  const isSafeOperationAircraftTask = item.id === '606';
  
  // Check if it's the Density Altitude task
  const isDensityAltitudeTask = item.id === '607';
  
  // Check if it's the Weight Balance Computations task
  const isWeightBalanceComputationsTask = item.id === '608';
  
  // Check if it's the Aerodynamics Powerplants task
  const isAerodynamicsPowerplantsTask = item.id === '609';
  
  // Check if it's the Stall Awareness task
  const isStallAwarenessTask = item.id === '610';
  
  // Check if it's the Aeronautical Decision Making task
  const isAeronauticalDecisionMakingTask = item.id === '611';
  
  // Check if it's the Preflight Action task
  const isPreflightActionTask = item.id === '612';

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
         '(4) Use of charts for VFR navigation, using pilotage, dead reckoning, and navigation systems',
         '(5) Radio communication procedures',
         '(6) Critical weather situations during ground and flight, windshear avoidance and the use of weather reports and forecasts',
         '(7) Safe and efficient operation of aircraft, including collision avoidance and recognition/avoidance of wake turbulence',
         '(8) Effects of density altitude on takeoff and climb performance',
         '(9) Weight and balance computations',
         '(10) Principles of aerodynamics, powerplants, and aircraft systems',
         '(11) Stall awareness, spin entry, spins, and spin recovery techniques',
         '(12) Aeronautical decision making and judgment',
         '(13) Preflight action that includes - (i) How to obtain information on runway lengths at airports of intended use, data on takeoff and landing distances, weather reports and forecasts, and fuel requirements; and (ii) How to plan for alternatives if the planned flight cannot be completed or delays are encountered.'
        ].includes(item.title)) {
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
    if (isKnowledgeTask || isApplicableFARsTask || isNTSBAccidentTask || 
        isAIMAdvisoryCircularsTask || isVFRNavigationChartsTask || 
        isRadioCommunicationProceduresTask || isCriticalWeatherSituationsTask ||
        isSafeOperationAircraftTask || isDensityAltitudeTask ||
        isWeightBalanceComputationsTask || isAerodynamicsPowerplantsTask || 
        isStallAwarenessTask || isAeronauticalDecisionMakingTask || isPreflightActionTask) {
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

  // Check if any subtask has input data
  const hasSubtaskWithInputData = () => {
    if (!item.subtasks || item.subtasks.length === 0) return false;
    return item.subtasks.some(subtask => 
      subtask.isCompleted && subtask.value !== undefined && subtask.value !== null
    );
  };

  // Update main task status when subtasks are completed or have input data
  useEffect(() => {
    if (item.subtasks && item.subtasks.length > 0 && !item.isCompleted) {
      // For flight proficiency tasks, require all subtasks to be completed
      if (isFlightProficiencyTask && areAllSubtasksCompleted()) {
        setTimeout(() => {
          onToggleComplete(item.id, true);
          toast.success(`${item.title} completed!`, {
            description: "Both Flight and Ground subtasks are now complete.",
          });
        }, 500); // Small delay to allow animations to complete
      }
      // For other tasks, mark as complete if any subtask has input data
      else if (!isFlightProficiencyTask && hasSubtaskWithInputData()) {
        setTimeout(() => {
          onToggleComplete(item.id, true);
          toast.success(`${item.title} completed!`, {
            description: "Task marked complete based on subtask data.",
          });
        }, 500); // Small delay to allow animations to complete
      }
    }
  }, [item.subtasks, item.isCompleted, item.id, item.title, isFlightProficiencyTask, onToggleComplete]);

  return {
    handleToggle,
    areAllSubtasksCompleted,
    hasSubtaskWithInputData
  };
};

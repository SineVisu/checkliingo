import React, { useContext } from 'react';
import ChecklistGroup from '@/components/checklists/ChecklistGroup';
import ChecklistProgress from '@/components/checklists/ChecklistProgress';
import CaptureButtons from '@/components/checklists/CaptureButtons';
import ChecklistHeader from '@/components/checklists/ChecklistHeader';
import EmptyState from '@/components/ui/EmptyState';
import { ChecklistContext } from '@/context/ChecklistContext';
import { toast } from 'sonner';

interface ChecklistContentProps {
  streak: number;
  onCreateNewChecklist: () => void;
  onCaptureLicense: () => void;
  onCaptureMedical: () => void;
}

const ChecklistContent: React.FC<ChecklistContentProps> = ({
  streak,
  onCreateNewChecklist,
  onCaptureLicense,
  onCaptureMedical
}) => {
  const { 
    checklists, 
    setChecklists,
    filterCategory
  } = useContext(ChecklistContext);

  const filteredChecklists = filterCategory
    ? checklists.filter(group => 
        group.items.some(item => item.category === filterCategory)
      )
    : checklists;

  const handleToggleItem = (groupId: string, itemId: string, completed: boolean, value?: string | Date) => {
    setChecklists(prevChecklists => 
      prevChecklists.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            items: group.items.map(item => 
              item.id === itemId ? { ...item, isCompleted: completed, value: value || item.value } : item
            )
          };
        }
        return group;
      })
    );

    if (completed && !value) {
      toast("Task completed!", {
        description: "Keep up the good work!",
        position: "top-center",
      });
    }
  };

  const totalTasks = checklists.reduce((acc, group) => acc + group.items.length, 0);
  const completedTasks = checklists.reduce(
    (acc, group) => acc + group.items.filter(item => item.isCompleted).length, 
    0
  );
  
  const overallProgress = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  const idGroup = checklists.find(group => group.id === '1');
  const showCaptureButton = idGroup && 
    idGroup.items.filter(item => ['101', '102', '103'].includes(item.id))
    .every(item => !item.isCompleted);

  const medicalGroup = checklists.find(group => group.id === '2');
  const showMedicalCaptureButton = medicalGroup && 
    medicalGroup.items.filter(item => ['201', '202'].includes(item.id))
    .every(item => !item.isCompleted);

  const getCategoryTitle = () => {
    if (filterCategory === 'proficiency') return 'Flight Proficiency FAR 61.107(b)(1)';
    if (filterCategory === 'knowledge') return 'Aeronautical Knowledge FAR 61.105(b)';
    if (filterCategory === 'identification') return 'Identification';
    if (filterCategory === 'experience') return 'Aeronautical Experience FAR 61.109';
    return 'FAA Private Pilot Practical Test // ASEL Checklist';
  };

  return (
    <main className="flex-1 px-4 pt-4 pb-20 max-w-lg mx-auto w-full">
      <ChecklistHeader 
        title={getCategoryTitle()}
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        streak={streak}
      />
      
      {filteredChecklists.length > 0 ? (
        <>
          <ChecklistProgress progress={overallProgress} />
          
          {!filterCategory && (
            <CaptureButtons 
              showLicenseCapture={showCaptureButton}
              showMedicalCapture={showMedicalCaptureButton}
              onCaptureLicense={onCaptureLicense}
              onCaptureMedical={onCaptureMedical}
            />
          )}
          
          <div className="space-y-6">
            {filteredChecklists.map(group => (
              <ChecklistGroup 
                key={group.id} 
                group={group} 
                onToggleItem={handleToggleItem} 
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyState />
      )}
    </main>
  );
};

export default ChecklistContent;

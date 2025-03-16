
import React, { useContext } from 'react';
import StreakCounter from '@/components/common/StreakCounter';
import { ChecklistContext } from '@/context/ChecklistContext';

interface ChecklistHeaderProps {
  title: string;
  completedTasks: number;
  totalTasks: number;
  streak: number;
}

const ChecklistHeader: React.FC<ChecklistHeaderProps> = ({ 
  title, 
  completedTasks, 
  totalTasks 
}) => {
  const { saveChecklistData } = useContext(ChecklistContext);
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground text-sm">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </div>
      <StreakCounter onSave={saveChecklistData} />
    </div>
  );
};

export default ChecklistHeader;

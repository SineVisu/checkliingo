
import React from 'react';
import StreakCounter from '@/components/common/StreakCounter';

interface ChecklistHeaderProps {
  title: string;
  completedTasks: number;
  totalTasks: number;
  streak: number;
}

const ChecklistHeader: React.FC<ChecklistHeaderProps> = ({ 
  title, 
  completedTasks, 
  totalTasks, 
  streak 
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground text-sm">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </div>
      <StreakCounter count={streak} />
    </div>
  );
};

export default ChecklistHeader;

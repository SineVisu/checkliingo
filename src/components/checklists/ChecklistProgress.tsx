
import React from 'react';

interface ChecklistProgressProps {
  progress: number;
}

const ChecklistProgress: React.FC<ChecklistProgressProps> = ({ progress }) => {
  return (
    <div className="mb-4 rounded-full bg-muted h-2 overflow-hidden">
      <div 
        className="h-full bg-primary rounded-full transition-all duration-700 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ChecklistProgress;

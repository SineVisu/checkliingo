
import React, { useContext } from 'react';
import ProgressCircle from '../common/ProgressCircle';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react'; 
import { ChecklistContext } from '@/context/ChecklistContext';

interface ChecklistProgressProps {
  progress: number;
}

const ChecklistProgress: React.FC<ChecklistProgressProps> = ({ progress }) => {
  const { saveChecklistData } = useContext(ChecklistContext);
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">Your progress</h3>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      
      <div className="relative">
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <Button
          onClick={saveChecklistData}
          className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full p-0 bg-orange-500 hover:bg-orange-600 text-white font-medium flex flex-col items-center justify-center"
          aria-label="Save my checklist"
        >
          <Save className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] leading-tight text-center">Save my checklist</span>
        </Button>
      </div>
    </div>
  );
};

export default ChecklistProgress;

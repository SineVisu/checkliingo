
import React from 'react';
import { Save } from 'lucide-react';

interface StreakCounterProps {
  onSave: () => void;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ onSave }) => {
  return (
    <div 
      className="flex items-center bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full cursor-pointer hover:opacity-90 transition-opacity"
      onClick={onSave}
      role="button"
      aria-label="Save checklist data"
    >
      <Save className="h-5 w-5 mr-2" />
      <div className="flex flex-col">
        <span className="text-sm font-medium">Save checklist data</span>
      </div>
    </div>
  );
};

export default StreakCounter;


import React from 'react';
import { Flame } from 'lucide-react';

interface StreakCounterProps {
  count: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ count }) => {
  return (
    <div className="flex items-center bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full animate-pop">
      <Flame className="h-5 w-5 mr-2 animate-pulse-gentle" />
      <div className="flex flex-col">
        <span className="text-xs font-medium opacity-90">Current Streak</span>
        <span className="text-lg font-bold -mt-1">{count} days</span>
      </div>
    </div>
  );
};

export default StreakCounter;


import React from 'react';
import { Trophy } from 'lucide-react';

const CongratulationsContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-6 space-y-4">
      <div className="bg-amber-100 p-6 rounded-full">
        <Trophy className="h-12 w-12 text-amber-500" />
      </div>
      
      <div className="text-center space-y-4">
        <p className="text-lg">
          You've put in so much hard work and you are now eligible for your Private Pilot Practical Test!
        </p>
        <p className="text-muted-foreground">
          Thank you for using Flyber Checklist!
        </p>
      </div>
    </div>
  );
};

export default CongratulationsContent;

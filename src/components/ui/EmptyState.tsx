
import React from 'react';
import { ListChecks } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl glass-panel my-8 animate-scale">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <ListChecks className="h-8 w-8 text-primary" />
      </div>
      
      <h3 className="text-xl font-bold mb-2">Checklist</h3>
      
      <p className="text-center text-muted-foreground mb-6 max-w-xs text-balance">
        Your predefined checklist items are displayed above.
      </p>
    </div>
  );
};

export default EmptyState;

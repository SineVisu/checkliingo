
import React from 'react';
import { ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onCreateNew: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateNew }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl glass-panel my-8 animate-scale">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <ListChecks className="h-8 w-8 text-primary" />
      </div>
      
      <h3 className="text-xl font-bold mb-2">No checklists yet</h3>
      
      <p className="text-center text-muted-foreground mb-6 max-w-xs text-balance">
        Create your first checklist to start tracking your tasks and build a daily streak.
      </p>
      
      <Button 
        onClick={onCreateNew}
        className="rounded-xl transition-all transform hover:scale-105"
      >
        Create Your First Checklist
      </Button>
    </div>
  );
};

export default EmptyState;

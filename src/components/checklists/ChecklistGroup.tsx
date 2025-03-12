
import React, { useState } from 'react';
import ChecklistItem, { ChecklistItemData } from './ChecklistItem';
import ProgressCircle from '../common/ProgressCircle';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ChecklistGroupData {
  id: string;
  title: string;
  items: ChecklistItemData[];
}

interface ChecklistGroupProps {
  group: ChecklistGroupData;
  onToggleItem: (groupId: string, itemId: string, completed: boolean) => void;
}

const ChecklistGroup: React.FC<ChecklistGroupProps> = ({ group, onToggleItem }) => {
  const [expanded, setExpanded] = useState(true);
  const { id, title, items } = group;
  
  const completedCount = items.filter(item => item.isCompleted).length;
  const progress = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  const handleToggleItem = (itemId: string, completed: boolean) => {
    onToggleItem(id, itemId, completed);
  };

  return (
    <div className="mb-6 animate-slide-up">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <h2 className="text-lg font-bold">{title}</h2>
          <span className="ml-2 text-sm text-muted-foreground">
            {completedCount}/{items.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <ProgressCircle progress={progress} size={32} strokeWidth={3}>
            <span className="text-xs font-medium">{progress}%</span>
          </ProgressCircle>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {expanded && (
        <div className="space-y-1">
          {items.map((item) => (
            <ChecklistItem 
              key={item.id} 
              item={item} 
              onToggleComplete={handleToggleItem} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChecklistGroup;


import React from 'react';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChecklistItemData } from './ChecklistItem';

interface ChecklistItemActionsProps {
  item?: ChecklistItemData;
}

const ChecklistItemActions: React.FC<ChecklistItemActionsProps> = ({ item }) => {
  return (
    <Button variant="ghost" size="icon" className="rounded-full">
      <MoreVertical className="h-4 w-4 text-gray-400" />
    </Button>
  );
};

export default ChecklistItemActions;

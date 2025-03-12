
import React, { useState } from 'react';
import { Check, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LicenseNameDialog from './LicenseNameDialog';
import { toast } from 'sonner';

export interface ChecklistItemData {
  id: string;
  title: string;
  isCompleted: boolean;
  category?: string;
}

interface ChecklistItemProps {
  item: ChecklistItemData;
  onToggleComplete: (id: string, completed: boolean) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, onToggleComplete }) => {
  const [animating, setAnimating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleToggle = () => {
    if (item.title === 'Your Name') {
      setDialogOpen(true);
      return;
    }

    setAnimating(true);
    setTimeout(() => {
      onToggleComplete(item.id, !item.isCompleted);
      setAnimating(false);
    }, 300);
  };

  const handleSaveLicenseName = (name: string) => {
    toast.success(`License name saved: ${name}`);
    onToggleComplete(item.id, true);
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'work':
        return 'bg-blue-100 text-blue-800';
      case 'personal':
        return 'bg-purple-100 text-purple-800';
      case 'health':
        return 'bg-green-100 text-green-800';
      case 'learning':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div 
        className={`bg-white rounded-xl p-4 mb-3 task-shadow flex items-center animate-scale transition-all duration-300 ${
          animating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div className="flex-1 flex items-center">
          <button 
            onClick={handleToggle} 
            className={`checkbox-container mr-3 ${item.isCompleted ? 'checked' : ''}`}
          >
            <div className={`checkbox-circle ${item.isCompleted ? 'border-success' : 'border-gray-300'}`}>
              <Check className="h-3 w-3 text-white checkbox-icon" />
            </div>
          </button>
          
          <div className="flex-1">
            <p className={`font-medium transition-all duration-300 ${
              item.isCompleted ? 'text-gray-800' : 'text-gray-800'
            }`}>
              {item.title}
            </p>
            
            {item.category && (
              <span className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${getCategoryColor(item.category)}`}>
                {item.category}
              </span>
            )}
          </div>
        </div>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVertical className="h-4 w-4 text-gray-400" />
        </Button>
      </div>

      {item.title === 'Your Name' && (
        <LicenseNameDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSaveLicenseName}
        />
      )}
    </>
  );
};

export default ChecklistItem;

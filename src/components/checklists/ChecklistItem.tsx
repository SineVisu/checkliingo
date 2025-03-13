
import React, { useState, useContext } from 'react';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ChecklistContext } from '@/context/ChecklistContext';
import ValueDisplay from './ValueDisplay';
import DialogSelector from './DialogSelector';
import CategoryLabel from './CategoryLabel';
import ChecklistItemActions from './ChecklistItemActions';

export interface ChecklistItemData {
  id: string;
  title: string;
  isCompleted: boolean;
  category?: string;
  value?: string | Date | { date?: Date; hours?: string; pageNumber?: string };
}

interface ChecklistItemProps {
  item: ChecklistItemData;
  onToggleComplete: (id: string, completed: boolean, value?: string | Date | { date?: Date; hours?: string; pageNumber?: string }) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, onToggleComplete }) => {
  const [animating, setAnimating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { checkNameDiscrepancy } = useContext(ChecklistContext);

  const handleToggle = () => {
    if (['Name as it appears on Certificate', 'Name as it appears on Medical', 
         'Date of Issuance', 'Certificate Number', 'FTN# (FAA Tracking Number)',
         '(i) Preflight preparation'].includes(item.title)) {
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
    toast.success(`Certificate name saved: ${name}`);
    onToggleComplete(item.id, true, name);
    
    // After setting the name, check for discrepancies
    if (item.title === 'Name as it appears on Certificate' || item.title === 'Name as it appears on Medical') {
      checkNameDiscrepancy();
    }
  };
  
  const handleSaveIssuanceDate = (date: Date) => {
    toast.success(`Date of issuance saved: ${format(date, 'MMMM d, yyyy')}`);
    onToggleComplete(item.id, true, date);
  };

  const handleSaveCertificateNumber = (number: string) => {
    toast.success(`Certificate number saved: ${number}`);
    onToggleComplete(item.id, true, number);
  };

  const handleSaveFTN = (ftn: string) => {
    toast.success(`FTN# saved: ${ftn}`);
    onToggleComplete(item.id, true, ftn);
  };

  const handleSavePreflight = (data: { date: Date; hours: string; pageNumber?: string }) => {
    const pageInfo = data.pageNumber ? ` - Page: ${data.pageNumber}` : '';
    toast.success(`Preflight preparation details saved: ${format(data.date, 'MMMM d, yyyy')} - ${data.hours} hours${pageInfo}`);
    onToggleComplete(item.id, true, data);
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
            
            {item.value && (
              <p className="text-xs text-gray-500 mt-1">
                <ValueDisplay value={item.value} />
              </p>
            )}
            
            <CategoryLabel category={item.category} />
          </div>
        </div>
        
        <ChecklistItemActions />
      </div>

      <DialogSelector 
        itemTitle={item.title}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSaveLicenseName={handleSaveLicenseName}
        onSaveIssuanceDate={handleSaveIssuanceDate}
        onSaveCertificateNumber={handleSaveCertificateNumber}
        onSaveFTN={handleSaveFTN}
        onSavePreflight={handleSavePreflight}
        initialValue={item.value}
      />
    </>
  );
};

export default ChecklistItem;

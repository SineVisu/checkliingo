import React, { useState, useContext } from 'react';
import { Check, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LicenseNameDialog from './LicenseNameDialog';
import IssuanceDateDialog from './IssuanceDateDialog';
import CertificateNumberDialog from './CertificateNumberDialog';
import FTNDialog from './FTNDialog';
import PreflightPreparationDialog from './PreflightPreparationDialog';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ChecklistContext } from '@/context/ChecklistContext';

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
  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [certificateDialogOpen, setCertificateDialogOpen] = useState(false);
  const [ftnDialogOpen, setFtnDialogOpen] = useState(false);
  const [preflightDialogOpen, setPreflightDialogOpen] = useState(false);
  const { checkNameDiscrepancy } = useContext(ChecklistContext);

  const handleToggle = () => {
    if (item.title === 'Name as it appears on Certificate' || item.title === 'Name as it appears on Medical') {
      setNameDialogOpen(true);
      return;
    }
    
    if (item.title === 'Date of Issuance') {
      setDateDialogOpen(true);
      return;
    }

    if (item.title === 'Certificate Number') {
      setCertificateDialogOpen(true);
      return;
    }

    if (item.title === 'FTN# (FAA Tracking Number)') {
      setFtnDialogOpen(true);
      return;
    }

    if (item.title === '(i) Preflight preparation') {
      setPreflightDialogOpen(true);
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
      case 'identification':
        return 'bg-teal-100 text-teal-800';
      case 'medical':
        return 'bg-rose-100 text-rose-800';
      case 'proficiency':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderValue = (value: any) => {
    if (!value) return null;
    
    if (value instanceof Date) {
      return format(value, 'MMMM d, yyyy');
    } 
    
    if (typeof value === 'object' && value.date) {
      return (
        <>
          <span>Date: {format(value.date, 'MMMM d, yyyy')}</span>
          {value.hours && <span className="ml-2">Hours: {value.hours}</span>}
          {value.pageNumber && <span className="ml-2">Page: {value.pageNumber}</span>}
        </>
      );
    }
    
    return value.toString();
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
                {renderValue(item.value)}
              </p>
            )}
            
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

      {item.title === 'Name as it appears on Certificate' && (
        <LicenseNameDialog
          isOpen={nameDialogOpen}
          onClose={() => setNameDialogOpen(false)}
          onSave={handleSaveLicenseName}
        />
      )}
      
      {item.title === 'Name as it appears on Medical' && (
        <LicenseNameDialog
          isOpen={nameDialogOpen}
          onClose={() => setNameDialogOpen(false)}
          onSave={handleSaveLicenseName}
        />
      )}
      
      {item.title === 'Date of Issuance' && (
        <IssuanceDateDialog
          isOpen={dateDialogOpen}
          onClose={() => setDateDialogOpen(false)}
          onSave={handleSaveIssuanceDate}
        />
      )}

      {item.title === 'Certificate Number' && (
        <CertificateNumberDialog
          isOpen={certificateDialogOpen}
          onClose={() => setCertificateDialogOpen(false)}
          onSave={handleSaveCertificateNumber}
        />
      )}

      {item.title === 'FTN# (FAA Tracking Number)' && (
        <FTNDialog
          isOpen={ftnDialogOpen}
          onClose={() => setFtnDialogOpen(false)}
          onSave={handleSaveFTN}
          initialValue={item.value as string}
        />
      )}

      {item.title === '(i) Preflight preparation' && (
        <PreflightPreparationDialog
          isOpen={preflightDialogOpen}
          onClose={() => setPreflightDialogOpen(false)}
          onSave={handleSavePreflight}
          initialValues={
            typeof item.value === 'object' && !(item.value instanceof Date)
              ? item.value as { date?: Date; hours?: string; pageNumber?: string }
              : undefined
          }
        />
      )}
    </>
  );
};

export default ChecklistItem;


import { toast } from 'sonner';
import { format } from 'date-fns';
import { ChecklistContext } from '@/context/ChecklistContext';
import { useContext } from 'react';
import { ChecklistItemData } from '@/components/checklists/ChecklistItem';

interface UseDialogCallbacksProps {
  item: ChecklistItemData;
  onToggleComplete: (id: string, completed: boolean, value?: any) => void;
}

export const useDialogCallbacks = ({ item, onToggleComplete }: UseDialogCallbacksProps) => {
  const { checkNameDiscrepancy } = useContext(ChecklistContext);
  
  // Check if item is a Flight Proficiency task (in group 4)
  const isFlightProficiencyTask = item.id.startsWith('4') && !item.id.includes('-');
  // Check if item is an Aeronautical Knowledge task (in group 5)
  const isKnowledgeTask = item.id.startsWith('5');

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
    toast.success(`${item.title} details saved: ${format(data.date, 'MMMM d, yyyy')} - ${data.hours} hours${pageInfo}`);
    
    // Add parent task title to the data for displaying in dialog title
    const parentItem = isFlightProficiencyTask ? item : null;
    const knowledgeParentTitle = isKnowledgeTask ? item.title : null;
    
    const completeData = {
      ...data,
      parentTaskTitle: knowledgeParentTitle || (parentItem?.title || null)
    };
    
    onToggleComplete(item.id, true, completeData);
  };

  const handleSaveLogbookPage = (pageNumber: string) => {
    toast.success(`Logbook page saved: ${pageNumber}`, {
      description: `for ${item.title}`
    });
    onToggleComplete(item.id, true, pageNumber);
  };

  const handleSaveKnowledgeTestResults = (data: { score: string; date: Date }) => {
    toast.success(`Knowledge test results saved: ${data.score}%`, {
      description: `Test date: ${format(data.date, 'MMMM d, yyyy')}`
    });
    onToggleComplete(item.id, true, data);
  };

  return {
    handleSaveLicenseName,
    handleSaveIssuanceDate,
    handleSaveCertificateNumber,
    handleSaveFTN,
    handleSavePreflight,
    handleSaveLogbookPage,
    handleSaveKnowledgeTestResults
  };
};

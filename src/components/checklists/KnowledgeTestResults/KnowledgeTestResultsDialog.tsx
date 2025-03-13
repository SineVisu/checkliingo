
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BookText } from 'lucide-react';
import KnowledgeTestResultsForm, { KnowledgeTestFormValues } from './KnowledgeTestResultsForm';

interface KnowledgeTestResultsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { score: string; date: Date; pltCodes?: string[] }) => void;
  dialogTitle?: string;
  initialValues?: { score?: string; date?: Date; pltCodes?: string[] };
}

const KnowledgeTestResultsDialog: React.FC<KnowledgeTestResultsDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  dialogTitle = 'Knowledge Test Results',
  initialValues
}) => {
  const handleFormSubmit = (data: KnowledgeTestFormValues) => {
    if (data.score && data.date) {
      onSave({ 
        score: data.score, 
        date: data.date, 
        pltCodes: data.pltCodes 
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookText className="h-5 w-5 text-primary" />
            <span>{dialogTitle}</span>
          </DialogTitle>
        </DialogHeader>
        
        <KnowledgeTestResultsForm
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default KnowledgeTestResultsDialog;

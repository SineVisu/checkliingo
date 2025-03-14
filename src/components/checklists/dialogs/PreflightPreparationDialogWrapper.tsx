
import React from 'react';
import PreflightPreparationDialog from '../PreflightPreparationDialog';

interface PreflightPreparationDialogWrapperProps {
  itemTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValue?: any;
}

const PreflightPreparationDialogWrapper: React.FC<PreflightPreparationDialogWrapperProps> = ({
  itemTitle,
  isOpen,
  onClose,
  onSavePreflight,
  initialValue
}) => {
  let dialogTitle = itemTitle === 'Flight' ? 'Flight Training' : 'Ground Training';
  
  // Special case for FAR knowledge task
  if (itemTitle === '(1) Applicable FAR\'s: private pilot privileges, limitations, and flight operations') {
    dialogTitle = 'FAR Knowledge Training';
  }
  
  return (
    <PreflightPreparationDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSavePreflight}
      dialogTitle={dialogTitle}
      initialValues={
        typeof initialValue === 'object' && !(initialValue instanceof Date)
          ? initialValue as { date?: Date; hours?: string; pageNumber?: string; parentTaskTitle?: string }
          : undefined
      }
    />
  );
};

export default PreflightPreparationDialogWrapper;

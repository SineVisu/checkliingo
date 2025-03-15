
import React from 'react';
import PreflightActionDialog from '../PreflightActionDialog';

interface PreflightActionDialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValue?: any;
  title?: string;
}

const PreflightActionDialogWrapper: React.FC<PreflightActionDialogWrapperProps> = ({
  isOpen,
  onClose,
  onSavePreflight,
  initialValue,
  title
}) => {
  return (
    <PreflightActionDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSavePreflight}
      initialValues={
        typeof initialValue === 'object' && !(initialValue instanceof Date)
          ? initialValue as { date?: Date; hours?: string; pageNumber?: string; parentTaskTitle?: string }
          : undefined
      }
    />
  );
};

export default PreflightActionDialogWrapper;

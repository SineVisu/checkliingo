
import React from 'react';
import SafeOperationDialog from '../SafeOperationDialog';

interface SafeOperationDialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValue?: { date?: Date; hours?: string; pageNumber?: string; parentTaskTitle?: string };
}

const SafeOperationDialogWrapper: React.FC<SafeOperationDialogWrapperProps> = ({
  isOpen,
  onClose,
  onSavePreflight,
  initialValue
}) => {
  return (
    <SafeOperationDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSavePreflight}
      initialValues={initialValue}
    />
  );
};

export default SafeOperationDialogWrapper;

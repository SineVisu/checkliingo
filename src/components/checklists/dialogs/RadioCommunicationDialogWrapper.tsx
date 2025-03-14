
import React from 'react';
import RadioCommunicationDialog from '../RadioCommunicationDialog';

interface RadioCommunicationDialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValue?: any;
}

const RadioCommunicationDialogWrapper: React.FC<RadioCommunicationDialogWrapperProps> = ({
  isOpen,
  onClose,
  onSavePreflight,
  initialValue
}) => {
  const handleSave = (data: { date: Date; hours: string; pageNumber: string }) => {
    onSavePreflight(data);
  };

  return (
    <RadioCommunicationDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      initialValues={
        typeof initialValue === 'object' && !(initialValue instanceof Date)
          ? initialValue as { date?: Date; hours?: string; pageNumber?: string; parentTaskTitle?: string }
          : undefined
      }
    />
  );
};

export default RadioCommunicationDialogWrapper;

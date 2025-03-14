
import React from 'react';
import AIMAdvisoryCircularsDialog from '../AIMAdvisoryCircularsDialog';

interface AIMAdvisoryCircularsDialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValue?: any;
}

const AIMAdvisoryCircularsDialogWrapper: React.FC<AIMAdvisoryCircularsDialogWrapperProps> = ({
  isOpen,
  onClose,
  onSavePreflight,
  initialValue
}) => {
  const handleSave = (data: { date: Date; hours: string; pageNumber: string }) => {
    onSavePreflight(data);
  };

  return (
    <AIMAdvisoryCircularsDialog
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

export default AIMAdvisoryCircularsDialogWrapper;

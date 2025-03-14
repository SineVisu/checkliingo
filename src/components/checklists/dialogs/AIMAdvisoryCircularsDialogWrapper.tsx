
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
      initialValues={initialValue}
    />
  );
};

export default AIMAdvisoryCircularsDialogWrapper;

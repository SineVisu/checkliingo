
import React from 'react';
import VFRNavigationChartsDialog from '../VFRNavigationChartsDialog';

interface VFRNavigationChartsDialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValue?: any;
}

const VFRNavigationChartsDialogWrapper: React.FC<VFRNavigationChartsDialogWrapperProps> = ({
  isOpen,
  onClose,
  onSavePreflight,
  initialValue
}) => {
  const handleSave = (data: { date: Date; hours: string; pageNumber: string }) => {
    onSavePreflight(data);
  };

  return (
    <VFRNavigationChartsDialog
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

export default VFRNavigationChartsDialogWrapper;

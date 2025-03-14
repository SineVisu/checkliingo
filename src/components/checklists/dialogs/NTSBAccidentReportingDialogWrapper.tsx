
import React from 'react';
import NTSBAccidentReportingDialog from '../NTSBAccidentReportingDialog';

interface NTSBAccidentReportingDialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValue?: any;
}

const NTSBAccidentReportingDialogWrapper: React.FC<NTSBAccidentReportingDialogWrapperProps> = ({
  isOpen,
  onClose,
  onSavePreflight,
  initialValue
}) => {
  const handleSave = (data: { date: Date; hours: string; pageNumber: string }) => {
    onSavePreflight(data);
  };

  return (
    <NTSBAccidentReportingDialog
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

export default NTSBAccidentReportingDialogWrapper;

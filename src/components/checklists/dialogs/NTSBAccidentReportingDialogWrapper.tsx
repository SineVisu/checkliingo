
import React from 'react';
import NTSBAccidentReportingDialog from '../NTSBAccidentReportingDialog';

interface NTSBAccidentReportingDialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValue?: any;
}

const NTSBAccidentReportingDialogWrapper: React.FC<NTSBAccidentReportingDialogWrapperProps> = ({
  isOpen,
  onClose,
  onSave,
  initialValue
}) => {
  return (
    <NTSBAccidentReportingDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      initialValues={
        typeof initialValue === 'object' && !(initialValue instanceof Date)
          ? initialValue as { date?: Date; hours?: string; pageNumber?: string; parentTaskTitle?: string }
          : undefined
      }
    />
  );
};

export default NTSBAccidentReportingDialogWrapper;

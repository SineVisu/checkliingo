
import React from 'react';
import AeronauticalDecisionMakingDialog from '../AeronauticalDecisionMakingDialog';

interface AeronauticalDecisionMakingDialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValue?: any;
}

const AeronauticalDecisionMakingDialogWrapper: React.FC<AeronauticalDecisionMakingDialogWrapperProps> = ({
  isOpen,
  onClose,
  onSavePreflight,
  initialValue
}) => {
  return (
    <AeronauticalDecisionMakingDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSavePreflight}
      initialValues={initialValue}
    />
  );
};

export default AeronauticalDecisionMakingDialogWrapper;

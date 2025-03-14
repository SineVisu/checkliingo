
import React from 'react';
import AerodynamicsPowerplantsDialog from '../AerodynamicsPowerplantsDialog';

interface AerodynamicsPowerplantsDialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValue?: { date?: Date; hours?: string; pageNumber?: string; parentTaskTitle?: string };
}

const AerodynamicsPowerplantsDialogWrapper: React.FC<AerodynamicsPowerplantsDialogWrapperProps> = ({
  isOpen,
  onClose,
  onSavePreflight,
  initialValue
}) => {
  return (
    <AerodynamicsPowerplantsDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSavePreflight}
      initialValues={initialValue}
    />
  );
};

export default AerodynamicsPowerplantsDialogWrapper;

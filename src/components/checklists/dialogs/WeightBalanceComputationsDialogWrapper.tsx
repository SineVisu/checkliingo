
import React from 'react';
import WeightBalanceComputationsDialog from '../WeightBalanceComputationsDialog';

interface WeightBalanceComputationsDialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValue?: { date?: Date; hours?: string; pageNumber?: string; parentTaskTitle?: string };
}

const WeightBalanceComputationsDialogWrapper: React.FC<WeightBalanceComputationsDialogWrapperProps> = ({
  isOpen,
  onClose,
  onSavePreflight,
  initialValue
}) => {
  return (
    <WeightBalanceComputationsDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSavePreflight}
      initialValues={initialValue}
    />
  );
};

export default WeightBalanceComputationsDialogWrapper;

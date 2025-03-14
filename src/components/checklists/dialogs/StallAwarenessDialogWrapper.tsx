
import React from 'react';
import StallAwarenessDialog from '../StallAwarenessDialog';

interface StallAwarenessDialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValue?: any;
}

const StallAwarenessDialogWrapper: React.FC<StallAwarenessDialogWrapperProps> = ({
  isOpen,
  onClose,
  onSavePreflight,
  initialValue
}) => {
  return (
    <StallAwarenessDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSavePreflight}
      initialValues={initialValue}
    />
  );
};

export default StallAwarenessDialogWrapper;

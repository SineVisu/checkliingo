
import React from 'react';
import FTNDialog from '../FTNDialog';

interface FTNDialogWrapperProps {
  itemTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveFTN: (ftn: string) => void;
  initialValue?: any;
}

const FTNDialogWrapper: React.FC<FTNDialogWrapperProps> = ({
  itemTitle,
  isOpen,
  onClose,
  onSaveFTN,
  initialValue
}) => {
  return (
    <FTNDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSaveFTN}
      initialValue={initialValue as string}
      dialogTitle={itemTitle}
    />
  );
};

export default FTNDialogWrapper;

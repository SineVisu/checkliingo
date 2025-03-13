
import React from 'react';
import IssuanceDateDialog from '../IssuanceDateDialog';

interface IssuanceDateDialogWrapperProps {
  itemTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveIssuanceDate: (date: Date) => void;
  initialValue?: any;
}

const IssuanceDateDialogWrapper: React.FC<IssuanceDateDialogWrapperProps> = ({
  itemTitle,
  isOpen,
  onClose,
  onSaveIssuanceDate,
  initialValue
}) => {
  const isMedical = itemTitle === 'Date of examination';
  
  return (
    <IssuanceDateDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSaveIssuanceDate}
      isMedical={isMedical}
      initialDate={initialValue instanceof Date ? initialValue : undefined}
    />
  );
};

export default IssuanceDateDialogWrapper;

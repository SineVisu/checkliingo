
import React from 'react';
import LicenseNameDialog from '../LicenseNameDialog';

interface LicenseNameDialogWrapperProps {
  itemTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveLicenseName: (name: string) => void;
}

const LicenseNameDialogWrapper: React.FC<LicenseNameDialogWrapperProps> = ({
  itemTitle,
  isOpen,
  onClose,
  onSaveLicenseName
}) => {
  return (
    <LicenseNameDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSaveLicenseName}
      dialogTitle={itemTitle}
    />
  );
};

export default LicenseNameDialogWrapper;

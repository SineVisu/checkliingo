
import React from 'react';
import CertificateNumberDialog from '../CertificateNumberDialog';

interface CertificateNumberDialogWrapperProps {
  itemTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveCertificateNumber: (number: string) => void;
}

const CertificateNumberDialogWrapper: React.FC<CertificateNumberDialogWrapperProps> = ({
  itemTitle,
  isOpen,
  onClose,
  onSaveCertificateNumber
}) => {
  return (
    <CertificateNumberDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSaveCertificateNumber}
      dialogTitle={itemTitle}
    />
  );
};

export default CertificateNumberDialogWrapper;

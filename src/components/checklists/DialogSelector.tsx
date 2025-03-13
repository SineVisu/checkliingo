
import React from 'react';
import LicenseNameDialog from './LicenseNameDialog';
import IssuanceDateDialog from './IssuanceDateDialog';
import CertificateNumberDialog from './CertificateNumberDialog';
import FTNDialog from './FTNDialog';
import PreflightPreparationDialog from './PreflightPreparationDialog';

interface DialogSelectorProps {
  itemTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveLicenseName: (name: string) => void;
  onSaveIssuanceDate: (date: Date) => void;
  onSaveCertificateNumber: (number: string) => void;
  onSaveFTN: (ftn: string) => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValue?: any;
}

const DialogSelector: React.FC<DialogSelectorProps> = ({
  itemTitle,
  isOpen,
  onClose,
  onSaveLicenseName,
  onSaveIssuanceDate,
  onSaveCertificateNumber,
  onSaveFTN,
  onSavePreflight,
  initialValue
}) => {
  if (itemTitle === 'Name as it appears on Certificate' || itemTitle === 'Name as it appears on Medical') {
    return (
      <LicenseNameDialog
        isOpen={isOpen}
        onClose={onClose}
        onSave={onSaveLicenseName}
      />
    );
  }
  
  if (itemTitle === 'Date of Issuance') {
    return (
      <IssuanceDateDialog
        isOpen={isOpen}
        onClose={onClose}
        onSave={onSaveIssuanceDate}
      />
    );
  }

  if (itemTitle === 'Certificate Number') {
    return (
      <CertificateNumberDialog
        isOpen={isOpen}
        onClose={onClose}
        onSave={onSaveCertificateNumber}
      />
    );
  }

  if (itemTitle === 'FTN# (FAA Tracking Number)') {
    return (
      <FTNDialog
        isOpen={isOpen}
        onClose={onClose}
        onSave={onSaveFTN}
        initialValue={initialValue as string}
      />
    );
  }

  if (itemTitle === '(i) Preflight preparation') {
    return (
      <PreflightPreparationDialog
        isOpen={isOpen}
        onClose={onClose}
        onSave={onSavePreflight}
        initialValues={
          typeof initialValue === 'object' && !(initialValue instanceof Date)
            ? initialValue as { date?: Date; hours?: string; pageNumber?: string }
            : undefined
        }
      />
    );
  }

  return null;
};

export default DialogSelector;


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
        dialogTitle={itemTitle}
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
        dialogTitle={itemTitle}
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
        dialogTitle={itemTitle}
      />
    );
  }

  // Use PreflightPreparationDialog for Flight and Ground subtasks in any Flight Proficiency task
  // AND for any tasks in the 'experience' category
  if (itemTitle === 'Flight' || itemTitle === 'Ground' || itemTitle.includes('FAR 61.109')) {
    const dialogTitle = itemTitle === 'Flight' ? 'Flight Training' : 
                        itemTitle === 'Ground' ? 'Ground Training' : 
                        'Aeronautical Experience';
    
    return (
      <PreflightPreparationDialog
        isOpen={isOpen}
        onClose={onClose}
        onSave={onSavePreflight}
        dialogTitle={dialogTitle}
        initialValues={
          typeof initialValue === 'object' && !(initialValue instanceof Date)
            ? initialValue as { date?: Date; hours?: string; pageNumber?: string; parentTaskTitle?: string }
            : undefined
        }
      />
    );
  }

  return null;
};

export default DialogSelector;

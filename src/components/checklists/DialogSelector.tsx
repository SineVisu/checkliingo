import React from 'react';
import LicenseNameDialog from './LicenseNameDialog';
import IssuanceDateDialog from './IssuanceDateDialog';
import CertificateNumberDialog from './CertificateNumberDialog';
import FTNDialog from './FTNDialog';
import PreflightPreparationDialog from './PreflightPreparationDialog';
import LogbookPageDialog from './LogbookPageDialog';
import KnowledgeTestResultsDialog from './KnowledgeTestResults/KnowledgeTestResultsDialog';

interface DialogSelectorProps {
  itemTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveLicenseName: (name: string) => void;
  onSaveIssuanceDate: (date: Date) => void;
  onSaveCertificateNumber: (number: string) => void;
  onSaveFTN: (ftn: string) => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  onSaveLogbookPage: (pageNumber: string) => void;
  onSaveKnowledgeTestResults: (data: { score: string; date: Date; pltCodes?: string[] }) => void;
  initialValue?: any;
  category?: string;
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
  onSaveLogbookPage,
  onSaveKnowledgeTestResults,
  initialValue,
  category
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

  if (itemTitle === 'PAR Knowledge Test Results') {
    return (
      <KnowledgeTestResultsDialog
        isOpen={isOpen}
        onClose={onClose}
        onSave={onSaveKnowledgeTestResults}
        initialValues={
          typeof initialValue === 'object' && !(initialValue instanceof Date)
            ? initialValue as { score?: string; date?: Date; pltCodes?: string[] }
            : undefined
        }
      />
    );
  }

  if (itemTitle === 'Flight' || itemTitle === 'Ground') {
    const dialogTitle = itemTitle === 'Flight' ? 'Flight Training' : 'Ground Training';
    
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

  if (category === 'experience') {
    return (
      <LogbookPageDialog
        isOpen={isOpen}
        onClose={onClose}
        onSave={onSaveLogbookPage}
        dialogTitle={itemTitle}
        initialValue={typeof initialValue === 'string' ? initialValue : undefined}
      />
    );
  }

  return null;
};

export default DialogSelector;

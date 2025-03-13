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

const DialogSelector: React.FC<DialogSelectorProps> = (props) => {
  const {
    itemTitle,
    isOpen,
    onClose,
    initialValue,
    category
  } = props;
  
  // License Name or Medical Name Dialog
  if (isLicenseOrMedicalNameDialog(itemTitle)) {
    return renderLicenseNameDialog(props);
  }
  
  // Issuance Date Dialog
  if (itemTitle === 'Date of Issuance') {
    return renderIssuanceDateDialog(props);
  }

  // Certificate Number Dialog
  if (itemTitle === 'Certificate Number') {
    return renderCertificateNumberDialog(props);
  }

  // FTN Dialog
  if (itemTitle === 'FTN# (FAA Tracking Number)') {
    return renderFTNDialog(props);
  }

  // Knowledge Test Results Dialog
  if (itemTitle === 'PAR Knowledge Test Results') {
    return renderKnowledgeTestResultsDialog(props);
  }

  // Flight or Ground Training Dialog
  if (itemTitle === 'Flight' || itemTitle === 'Ground') {
    return renderPreflightPreparationDialog(props);
  }

  // Experience/Logbook Page Dialog
  if (category === 'experience') {
    return renderLogbookPageDialog(props);
  }

  return null;
};

// Helper function to check if dialog is for license or medical name
const isLicenseOrMedicalNameDialog = (itemTitle: string): boolean => {
  return itemTitle === 'Name as it appears on Certificate' || 
         itemTitle === 'Name as it appears on Medical';
};

// Render License Name Dialog
const renderLicenseNameDialog = (props: DialogSelectorProps) => {
  const { itemTitle, isOpen, onClose, onSaveLicenseName } = props;
  
  return (
    <LicenseNameDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSaveLicenseName}
      dialogTitle={itemTitle}
    />
  );
};

// Render Issuance Date Dialog
const renderIssuanceDateDialog = (props: DialogSelectorProps) => {
  const { itemTitle, isOpen, onClose, onSaveIssuanceDate, initialValue } = props;
  
  return (
    <IssuanceDateDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSaveIssuanceDate}
      isMedical={false}
      initialDate={initialValue instanceof Date ? initialValue : undefined}
    />
  );
};

// Render Certificate Number Dialog
const renderCertificateNumberDialog = (props: DialogSelectorProps) => {
  const { itemTitle, isOpen, onClose, onSaveCertificateNumber } = props;
  
  return (
    <CertificateNumberDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSaveCertificateNumber}
      dialogTitle={itemTitle}
    />
  );
};

// Render FTN Dialog
const renderFTNDialog = (props: DialogSelectorProps) => {
  const { itemTitle, isOpen, onClose, onSaveFTN, initialValue } = props;
  
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

// Render Knowledge Test Results Dialog
const renderKnowledgeTestResultsDialog = (props: DialogSelectorProps) => {
  const { isOpen, onClose, onSaveKnowledgeTestResults, initialValue } = props;
  
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
};

// Render Preflight Preparation Dialog
const renderPreflightPreparationDialog = (props: DialogSelectorProps) => {
  const { itemTitle, isOpen, onClose, onSavePreflight, initialValue } = props;
  
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
};

// Render Logbook Page Dialog
const renderLogbookPageDialog = (props: DialogSelectorProps) => {
  const { itemTitle, isOpen, onClose, onSaveLogbookPage, initialValue } = props;
  
  return (
    <LogbookPageDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSaveLogbookPage}
      dialogTitle={itemTitle}
      initialValue={typeof initialValue === 'string' ? initialValue : undefined}
    />
  );
};

export default DialogSelector;

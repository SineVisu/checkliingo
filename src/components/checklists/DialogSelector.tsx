
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
  
  // Dialog Type Identification Functions
  if (isLicenseOrMedicalNameDialog(itemTitle)) {
    return renderLicenseNameDialog(props);
  }
  
  if (isDateDialog(itemTitle)) {
    return renderIssuanceDateDialog(props);
  }

  if (isCertificateNumberDialog(itemTitle)) {
    return renderCertificateNumberDialog(props);
  }

  if (isFTNDialog(itemTitle)) {
    return renderFTNDialog(props);
  }

  if (isKnowledgeTestResultsDialog(itemTitle)) {
    return renderKnowledgeTestResultsDialog(props);
  }

  if (isTrainingDialog(itemTitle)) {
    return renderPreflightPreparationDialog(props);
  }

  if (isExperienceDialog(category)) {
    return renderLogbookPageDialog(props);
  }

  return null;
};

// Helper function to check if dialog is for license or medical name
const isLicenseOrMedicalNameDialog = (itemTitle: string): boolean => {
  return itemTitle === 'Name as it appears on Certificate' || 
         itemTitle === 'Name as it appears on Medical';
};

// Helper function to check if dialog is for dates
const isDateDialog = (itemTitle: string): boolean => {
  return itemTitle === 'Date of Issuance' || 
         itemTitle === 'Date of examination';
};

// Helper function to check if dialog is for certificate number
const isCertificateNumberDialog = (itemTitle: string): boolean => {
  return itemTitle === 'Certificate Number';
};

// Helper function to check if dialog is for FTN
const isFTNDialog = (itemTitle: string): boolean => {
  return itemTitle === 'FTN# (FAA Tracking Number)';
};

// Helper function to check if dialog is for knowledge test results
const isKnowledgeTestResultsDialog = (itemTitle: string): boolean => {
  return itemTitle === 'PAR Knowledge Test Results';
};

// Helper function to check if dialog is for training
const isTrainingDialog = (itemTitle: string): boolean => {
  return itemTitle === 'Flight' || itemTitle === 'Ground';
};

// Helper function to check if dialog is for experience/logbook
const isExperienceDialog = (category?: string): boolean => {
  return category === 'experience';
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


import React from 'react';
import { 
  isLicenseOrMedicalNameDialog,
  isDateDialog,
  isCertificateNumberDialog,
  isFTNDialog,
  isKnowledgeTestResultsDialog,
  isAeronauticalKnowledgeFARDialog,
  isNTSBAccidentReportingDialog,
  isTrainingDialog,
  isExperienceDialog,
  isAIMAdvisoryCircularsDialog,
  isVFRNavigationChartsDialog
} from './dialogs/dialogHelpers';
import LicenseNameDialogWrapper from './dialogs/LicenseNameDialogWrapper';
import IssuanceDateDialogWrapper from './dialogs/IssuanceDateDialogWrapper';
import CertificateNumberDialogWrapper from './dialogs/CertificateNumberDialogWrapper';
import FTNDialogWrapper from './dialogs/FTNDialogWrapper';
import KnowledgeTestResultsDialogWrapper from './dialogs/KnowledgeTestResultsDialogWrapper';
import PreflightPreparationDialogWrapper from './dialogs/PreflightPreparationDialogWrapper';
import LogbookPageDialogWrapper from './dialogs/LogbookPageDialogWrapper';
import NTSBAccidentReportingDialogWrapper from './dialogs/NTSBAccidentReportingDialogWrapper';
import AIMAdvisoryCircularsDialogWrapper from './dialogs/AIMAdvisoryCircularsDialogWrapper';
import VFRNavigationChartsDialogWrapper from './dialogs/VFRNavigationChartsDialogWrapper';

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
  const { itemTitle, category } = props;
  
  // Determine which dialog to render based on item title and category
  if (isLicenseOrMedicalNameDialog(itemTitle)) {
    return <LicenseNameDialogWrapper {...props} />;
  }
  
  if (isDateDialog(itemTitle)) {
    return <IssuanceDateDialogWrapper {...props} />;
  }

  if (isCertificateNumberDialog(itemTitle)) {
    return <CertificateNumberDialogWrapper {...props} />;
  }

  if (isFTNDialog(itemTitle)) {
    return <FTNDialogWrapper {...props} />;
  }

  if (isKnowledgeTestResultsDialog(itemTitle)) {
    return <KnowledgeTestResultsDialogWrapper {...props} />;
  }

  if (isNTSBAccidentReportingDialog(itemTitle)) {
    return <NTSBAccidentReportingDialogWrapper 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSavePreflight={props.onSavePreflight}
      initialValue={props.initialValue}
    />;
  }

  if (isAIMAdvisoryCircularsDialog(itemTitle)) {
    return <AIMAdvisoryCircularsDialogWrapper 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSavePreflight={props.onSavePreflight}
      initialValue={props.initialValue}
    />;
  }

  if (isVFRNavigationChartsDialog(itemTitle)) {
    return <VFRNavigationChartsDialogWrapper 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSavePreflight={props.onSavePreflight}
      initialValue={props.initialValue}
    />;
  }

  if (isAeronauticalKnowledgeFARDialog(itemTitle) || isTrainingDialog(itemTitle)) {
    return <PreflightPreparationDialogWrapper {...props} />;
  }

  if (isExperienceDialog(category)) {
    return <LogbookPageDialogWrapper {...props} />;
  }

  return null;
};

export default DialogSelector;


import React from 'react';
import { 
  isLicenseOrMedicalNameDialog,
  isDateDialog,
  isCertificateNumberDialog,
  isFTNDialog
} from '../dialogHelpers';
import LicenseNameDialogWrapper from '../LicenseNameDialogWrapper';
import IssuanceDateDialogWrapper from '../IssuanceDateDialogWrapper';
import CertificateNumberDialogWrapper from '../CertificateNumberDialogWrapper';
import FTNDialogWrapper from '../FTNDialogWrapper';

interface IdentificationDialogSelectorProps {
  itemTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveLicenseName: (name: string) => void;
  onSaveIssuanceDate: (date: Date) => void;
  onSaveCertificateNumber: (number: string) => void;
  onSaveFTN: (ftn: string) => void;
  initialValue?: any;
}

// Note: This component is kept for backward compatibility but is no longer used directly.
// Dialog selection is now handled by the DialogRegistry
export const IdentificationDialogSelector: React.FC<IdentificationDialogSelectorProps> = (props) => {
  const { itemTitle } = props;
  
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

  return null;
};

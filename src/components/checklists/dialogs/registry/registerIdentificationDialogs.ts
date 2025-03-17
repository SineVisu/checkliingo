
import { DialogRegistry } from './DialogRegistry';
import LicenseNameDialogWrapper from '../LicenseNameDialogWrapper';
import IssuanceDateDialogWrapper from '../IssuanceDateDialogWrapper';
import CertificateNumberDialogWrapper from '../CertificateNumberDialogWrapper';
import FTNDialogWrapper from '../FTNDialogWrapper';
import { 
  isLicenseOrMedicalNameDialog,
  isDateDialog,
  isCertificateNumberDialog,
  isFTNDialog
} from '../dialogHelpers';

export function registerIdentificationDialogs(): void {
  // License or Medical Name Dialog
  DialogRegistry.register({
    matcher: (title) => isLicenseOrMedicalNameDialog(title),
    component: (props) => <LicenseNameDialogWrapper {...props} />
  });
  
  // Issuance Date Dialog
  DialogRegistry.register({
    matcher: (title) => isDateDialog(title),
    component: (props) => <IssuanceDateDialogWrapper {...props} />
  });
  
  // Certificate Number Dialog
  DialogRegistry.register({
    matcher: (title) => isCertificateNumberDialog(title),
    component: (props) => <CertificateNumberDialogWrapper {...props} />
  });
  
  // FTN Dialog
  DialogRegistry.register({
    matcher: (title) => isFTNDialog(title),
    component: (props) => <FTNDialogWrapper {...props} />
  });
}

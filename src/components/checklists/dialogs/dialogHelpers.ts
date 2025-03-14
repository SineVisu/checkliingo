
import { ChecklistItemData } from '../ChecklistItem';

export const isLicenseOrMedicalNameDialog = (title: string) => {
  return title === 'Name as it appears on Certificate' || title === 'Name as it appears on Medical';
};

export const isDateDialog = (title: string) => {
  return title === 'Date of Issuance' || title === 'Date of Examination';
};

export const isCertificateNumberDialog = (title: string) => {
  return title === 'Certificate Number';
};

export const isFTNDialog = (title: string) => {
  return title === 'FTN# (FAA Tracking Number)';
};

export const isKnowledgeTestResultsDialog = (title: string) => {
  return title === 'PAR Knowledge Test Results';
};

export const isAeronauticalKnowledgeFARDialog = (title: string) => {
  return title === '(1) Applicable FAR\'s: private pilot privileges, limitations, and flight operations';
};

export const isNTSBAccidentReportingDialog = (title: string) => {
  return title === '(2) Accident reporting requirements of the NTSB' || 
         title === '(3) Use of the applicable portions of the AIM and FAA advisory circulars';
};

export const isTrainingDialog = (title: string) => {
  return title === 'Flight' || title === 'Ground';
};

export const isExperienceDialog = (category?: string) => {
  return category === 'experience';
};

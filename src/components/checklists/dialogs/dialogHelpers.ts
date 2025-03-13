
// Helper functions to identify dialog types

export const isLicenseOrMedicalNameDialog = (itemTitle: string): boolean => {
  return itemTitle === 'Name as it appears on Certificate' || 
         itemTitle === 'Name as it appears on Medical';
};

export const isDateDialog = (itemTitle: string): boolean => {
  return itemTitle === 'Date of Issuance';
};

export const isCertificateNumberDialog = (itemTitle: string): boolean => {
  return itemTitle === 'Certificate Number';
};

export const isFTNDialog = (itemTitle: string): boolean => {
  return itemTitle === 'FTN# (FAA Tracking Number)';
};

export const isKnowledgeTestResultsDialog = (itemTitle: string): boolean => {
  return itemTitle === 'PAR Knowledge Test Results';
};

export const isTrainingDialog = (itemTitle: string): boolean => {
  return itemTitle === 'Flight' || itemTitle === 'Ground';
};

export const isExperienceDialog = (category?: string): boolean => {
  return category === 'experience';
};

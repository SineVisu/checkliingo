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
  return title === '(2) Accident reporting requirements of the NTSB';
};

export const isAIMAdvisoryCircularsDialog = (title: string) => {
  return title === '(3) Use of the applicable portions of the AIM and FAA advisory circulars';
};

export const isVFRNavigationChartsDialog = (title: string) => {
  return title === '(4) Use of charts for VFR navigation, using pilotage, dead reckoning, and navigation systems';
};

export const isRadioCommunicationProceduresDialog = (title: string) => {
  return title === '(5) Radio communication procedures';
};

export const isCriticalWeatherSituationsDialog = (title: string) => {
  return title === '(6) Critical weather situations during ground and flight, windshear avoidance and the use of weather reports and forecasts';
};

export const isTrainingDialog = (title: string) => {
  return title === 'Flight' || title === 'Ground';
};

export const isExperienceDialog = (category?: string) => {
  return category === 'experience';
};

export const isSafeOperationAircraftDialog = (itemTitle: string): boolean => {
  return itemTitle === "(7) Safe and efficient operation of aircraft, including collision avoidance and recognition/avoidance of wake turbulence";
};

export const isDensityAltitudeDialog = (itemTitle: string): boolean => {
  return itemTitle === "(8) Effects of density altitude on takeoff and climb performance";
};

export const isWeightBalanceComputationsDialog = (itemTitle: string): boolean => {
  return itemTitle === "(9) Weight and balance computations";
};

export const isAerodynamicsPowerplantsDialog = (itemTitle: string): boolean => {
  return itemTitle === "(10) Principles of aerodynamics, powerplants, and aircraft systems";
};

export const isStallAwarenessDialog = (itemTitle: string): boolean => {
  return itemTitle === "(11) Stall awareness, spin entry, spins, and spin recovery techniques";
};

export const isAeronauticalDecisionMakingDialog = (itemTitle: string): boolean => {
  return itemTitle === "(12) Aeronautical decision making and judgment";
};

export const isPreflightActionDialog = (itemTitle: string): boolean => {
  return itemTitle === '(13) Preflight action that includes - (i) How to obtain information on runway lengths at airports of intended use, data on takeoff and landing distances, weather reports and forecasts, and fuel requirements; and (ii) How to plan for alternatives if the planned flight cannot be completed or delays are encountered.';
};

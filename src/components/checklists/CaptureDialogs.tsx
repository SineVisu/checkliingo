
import React from 'react';
import LicenseCapture from '@/components/checklists/LicenseCapture';
import MedicalCapture from '@/components/checklists/MedicalCapture';
import NameDiscrepancyDialog from '@/components/checklists/NameDiscrepancyDialog';
import MiddleNameDiscrepancyDialog from '@/components/checklists/MiddleNameDiscrepancyDialog';

interface CaptureDialogsProps {
  licenseCaptureOpen: boolean;
  medicalCaptureOpen: boolean;
  showNameDiscrepancy: boolean;
  showMiddleNameDiscrepancy: boolean;
  licenseName?: string;
  medicalName?: string;
  onCloseLicenseCapture: () => void;
  onCloseMedicalCapture: () => void;
  onCloseNameDiscrepancy: () => void;
  onCloseMiddleNameDiscrepancy: () => void;
  onLicenseCaptureComplete: (data: { name?: string; date?: Date; certificateNumber?: string }) => void;
  onMedicalCaptureComplete: (data: { name?: string; date?: Date }) => void;
  onAcknowledgeNameDiscrepancy: () => void;
  onAcknowledgeMiddleNameDiscrepancy: () => void;
}

const CaptureDialogs: React.FC<CaptureDialogsProps> = ({
  licenseCaptureOpen,
  medicalCaptureOpen,
  showNameDiscrepancy,
  showMiddleNameDiscrepancy,
  licenseName,
  medicalName,
  onCloseLicenseCapture,
  onCloseMedicalCapture,
  onCloseNameDiscrepancy,
  onCloseMiddleNameDiscrepancy,
  onLicenseCaptureComplete,
  onMedicalCaptureComplete,
  onAcknowledgeNameDiscrepancy,
  onAcknowledgeMiddleNameDiscrepancy
}) => {
  return (
    <>
      <LicenseCapture
        isOpen={licenseCaptureOpen}
        onClose={onCloseLicenseCapture}
        onSave={onLicenseCaptureComplete}
      />

      <MedicalCapture
        isOpen={medicalCaptureOpen}
        onClose={onCloseMedicalCapture}
        onSave={onMedicalCaptureComplete}
      />

      <NameDiscrepancyDialog
        isOpen={showNameDiscrepancy}
        onClose={onCloseNameDiscrepancy}
        licenseName={licenseName}
        medicalName={medicalName}
        onAcknowledge={onAcknowledgeNameDiscrepancy}
      />
      
      <MiddleNameDiscrepancyDialog
        isOpen={showMiddleNameDiscrepancy}
        onClose={onCloseMiddleNameDiscrepancy}
        licenseName={licenseName}
        medicalName={medicalName}
        onAcknowledge={onAcknowledgeMiddleNameDiscrepancy}
      />
    </>
  );
};

export default CaptureDialogs;

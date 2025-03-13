
import React from 'react';
import LicenseCapture from '@/components/checklists/LicenseCapture';
import MedicalCapture from '@/components/checklists/MedicalCapture';
import NameDiscrepancyDialog from '@/components/checklists/NameDiscrepancyDialog';

interface CaptureDialogsProps {
  licenseCaptureOpen: boolean;
  medicalCaptureOpen: boolean;
  showNameDiscrepancy: boolean;
  licenseName?: string;
  medicalName?: string;
  onCloseLicenseCapture: () => void;
  onCloseMedicalCapture: () => void;
  onCloseNameDiscrepancy: () => void;
  onLicenseCaptureComplete: (data: { name?: string; date?: Date; certificateNumber?: string }) => void;
  onMedicalCaptureComplete: (data: { name?: string; date?: Date }) => void;
}

const CaptureDialogs: React.FC<CaptureDialogsProps> = ({
  licenseCaptureOpen,
  medicalCaptureOpen,
  showNameDiscrepancy,
  licenseName,
  medicalName,
  onCloseLicenseCapture,
  onCloseMedicalCapture,
  onCloseNameDiscrepancy,
  onLicenseCaptureComplete,
  onMedicalCaptureComplete
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
      />
    </>
  );
};

export default CaptureDialogs;

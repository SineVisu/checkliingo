
import React from 'react';
import DensityAltitudeDialog from '../DensityAltitudeDialog';

interface DensityAltitudeDialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValue?: { date?: Date; hours?: string; pageNumber?: string; parentTaskTitle?: string };
}

const DensityAltitudeDialogWrapper: React.FC<DensityAltitudeDialogWrapperProps> = ({
  isOpen,
  onClose,
  onSavePreflight,
  initialValue
}) => {
  return (
    <DensityAltitudeDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSavePreflight}
      initialValues={initialValue}
    />
  );
};

export default DensityAltitudeDialogWrapper;


import React from 'react';
import CriticalWeatherSituationsDialog from '../CriticalWeatherSituationsDialog';

interface CriticalWeatherSituationsDialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreflight: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValue?: any;
}

const CriticalWeatherSituationsDialogWrapper: React.FC<CriticalWeatherSituationsDialogWrapperProps> = ({
  isOpen,
  onClose,
  onSavePreflight,
  initialValue
}) => {
  const handleSave = (data: { date: Date; hours: string; pageNumber: string }) => {
    onSavePreflight(data);
  };

  return (
    <CriticalWeatherSituationsDialog
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      initialValues={
        typeof initialValue === 'object' && !(initialValue instanceof Date)
          ? initialValue as { date?: Date; hours?: string; pageNumber?: string; parentTaskTitle?: string }
          : undefined
      }
    />
  );
};

export default CriticalWeatherSituationsDialogWrapper;

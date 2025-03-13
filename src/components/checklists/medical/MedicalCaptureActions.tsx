
import React from 'react';
import { Button } from "@/components/ui/button";

interface MedicalCaptureActionsProps {
  onCancel: () => void;
  onSave: () => void;
  disabled: boolean;
  isProcessing: boolean;
  hasImage: boolean;
}

const MedicalCaptureActions: React.FC<MedicalCaptureActionsProps> = ({
  onCancel,
  onSave,
  disabled,
  isProcessing,
  hasImage
}) => {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
      <Button 
        onClick={onSave}
        disabled={isProcessing || disabled}
      >
        {hasImage ? 'Save All' : 'Skip'}
      </Button>
    </div>
  );
};

export default MedicalCaptureActions;

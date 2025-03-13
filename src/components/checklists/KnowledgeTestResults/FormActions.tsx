
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  onCancel: () => void;
  isValid: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ onCancel, isValid }) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
      <Button 
        variant="outline" 
        onClick={onCancel}
        type="button"
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={!isValid}
      >
        Save Test Results
      </Button>
    </div>
  );
};

export default FormActions;

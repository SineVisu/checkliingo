
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import DateSelector from '@/components/common/DateSelector';
import { addMonths, isFuture, isAfter, subYears } from 'date-fns';

interface IssuanceDateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (date: Date) => void;
  isMedical?: boolean;
  initialDate?: Date;
}

const IssuanceDateDialog: React.FC<IssuanceDateDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  isMedical = false,
  initialDate
}) => {
  const [date, setDate] = useState<Date | undefined>(initialDate);
  
  // Update local state when initialDate changes
  useEffect(() => {
    if (initialDate) {
      setDate(initialDate);
    }
  }, [initialDate]);

  const handleSave = () => {
    if (date) {
      onSave(date);
      onClose();
    }
  };

  // Function to disable dates based on dialog type (medical or not)
  const disabledDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable future dates for both types
    if (isFuture(date)) return true;
    
    if (isMedical) {
      // For medical certificates, disable dates older than 3 years
      const threeYearsAgo = subYears(today, 3);
      return isAfter(threeYearsAgo, date);
    } else {
      // Regular certificate logic (no additional restrictions)
      return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isMedical ? 'Medical Examination Date' : 'Date of Issuance'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <DateSelector
            date={date}
            onDateChange={setDate}
            placeholder={isMedical ? "Select examination date" : "Select issuance date"}
            disabledDates={disabledDates}
          />
          {isMedical && (
            <p className="text-sm text-muted-foreground">
              Please select a date within the past 3 years.
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <Button type="button" onClick={handleSave} disabled={!date}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IssuanceDateDialog;

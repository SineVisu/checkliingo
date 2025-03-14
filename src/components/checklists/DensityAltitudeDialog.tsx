
import React, { useState, useEffect } from 'react';
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DateSelector from '@/components/common/DateSelector';

interface DensityAltitudeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { date: Date; hours: string; pageNumber: string }) => void;
  initialValues?: { date?: Date; hours?: string; pageNumber?: string; parentTaskTitle?: string };
}

const DensityAltitudeDialog: React.FC<DensityAltitudeDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialValues
}) => {
  const [date, setDate] = useState<Date | undefined>(initialValues?.date);
  const [hours, setHours] = useState<string>(initialValues?.hours || '');
  const [pageNumber, setPageNumber] = useState<string>(initialValues?.pageNumber || '');
  const [hoursError, setHoursError] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Validate form on every change
  useEffect(() => {
    const hoursPattern = /^\d{2}\.\d{1}$/;
    const isHoursValid = hoursPattern.test(hours);
    setIsFormValid(!!date && isHoursValid && !!pageNumber);
  }, [date, hours, pageNumber]);

  const handleSave = () => {
    // Only save if all fields are valid
    if (!isFormValid) return;
    
    if (!date) return;

    const hoursPattern = /^\d{2}\.\d{1}$/;
    if (!hoursPattern.test(hours)) {
      setHoursError('Hours must be in format 00.0');
      return;
    }

    onSave({ date, hours, pageNumber });
    onClose();
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHours(value);
    
    // Clear error when user is typing
    if (hoursError) {
      setHoursError('');
    }
  };

  // Function to disable future dates
  const disableFutureDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ground Training</DialogTitle>
          <DialogDescription>
            Enter the date of completion and hours for this training.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="density-altitude-training-date">Date of Completion</Label>
            <DateSelector
              date={date}
              onDateChange={setDate}
              placeholder="Select a date"
              disabledDates={disableFutureDates}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="hours">Hours (format: 00.0)</Label>
            <Input
              id="hours"
              value={hours}
              onChange={handleHoursChange}
              placeholder="e.g., 02.5"
              className={hoursError ? "border-red-500" : ""}
            />
            {hoursError && (
              <p className="text-sm text-red-500">{hoursError}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="pageNumber">Logbook Page Number</Label>
            <p className="text-xs text-gray-500 -mt-1 mb-1">Please provide the page number where this training is logged</p>
            <div className="relative">
              <Input
                id="pageNumber"
                value={pageNumber}
                onChange={(e) => setPageNumber(e.target.value)}
                placeholder="e.g., 42"
                className="pl-9"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BookOpen className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSave}
            disabled={!isFormValid}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DensityAltitudeDialog;

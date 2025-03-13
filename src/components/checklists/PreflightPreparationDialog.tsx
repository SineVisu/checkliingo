
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, BookOpen } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface PreflightPreparationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { date: Date; hours: string; pageNumber?: string }) => void;
  initialValues?: { date?: Date; hours?: string; pageNumber?: string };
}

const PreflightPreparationDialog: React.FC<PreflightPreparationDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialValues,
}) => {
  const [date, setDate] = useState<Date | undefined>(initialValues?.date);
  const [hours, setHours] = useState<string>(initialValues?.hours || '');
  const [pageNumber, setPageNumber] = useState<string>(initialValues?.pageNumber || '');
  const [hoursError, setHoursError] = useState<string>('');

  const handleSave = () => {
    // Validate inputs
    if (!date) {
      return;
    }

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Preflight Preparation Details</DialogTitle>
          <DialogDescription>
            Enter the date of completion and hours for preflight preparation.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="preflightDate">Date of Completion</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="preflightDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "MMMM d, yyyy") : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
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
          <Button type="button" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreflightPreparationDialog;


import React, { useState } from 'react';
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LogbookPageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pageNumber: string) => void;
  dialogTitle: string;
  initialValue?: string;
}

const LogbookPageDialog: React.FC<LogbookPageDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  dialogTitle,
  initialValue = '',
}) => {
  const [pageNumber, setPageNumber] = useState<string>(initialValue);
  const [error, setError] = useState<string>('');

  const handleSave = () => {
    if (!pageNumber.trim()) {
      setError('Please enter a logbook page number');
      return;
    }

    onSave(pageNumber);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Logbook Reference</DialogTitle>
          <DialogDescription>
            Please provide the logbook page number where this experience was satisfied.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <p className="text-sm text-gray-500 mb-4">
              If this event required multiple flights, list the final logbook page where it was completed.
            </p>
          </div>

          <div className="grid gap-2">
            <div className="relative">
              <Input
                id="pageNumber"
                value={pageNumber}
                onChange={(e) => {
                  setPageNumber(e.target.value);
                  setError('');
                }}
                placeholder="e.g., 42"
                className={`pl-9 ${error ? 'border-red-500' : ''}`}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BookOpen className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Task: <span className="font-semibold">{dialogTitle}</span>
            </p>
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

export default LogbookPageDialog;

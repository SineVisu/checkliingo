
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, BookText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KnowledgeTestResultsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { score: string; date: Date }) => void;
  dialogTitle?: string;
  initialValues?: { score?: string; date?: Date };
}

const KnowledgeTestResultsDialog: React.FC<KnowledgeTestResultsDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  dialogTitle = 'Knowledge Test Results',
  initialValues
}) => {
  const [score, setScore] = useState(initialValues?.score || '');
  const [date, setDate] = useState<Date | undefined>(initialValues?.date || undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (score && date) {
      onSave({ score, date });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookText className="h-5 w-5 text-primary" />
            <span>{dialogTitle}</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="score" className="text-sm font-medium">
              Test Score (%)
            </label>
            <Input
              id="score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="Enter your test score (e.g., 85)"
              className="w-full"
              required
              pattern="[0-9]+"
              type="number"
              min="0"
              max="100"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Test Date</label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Select test date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    setCalendarOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="text-sm text-muted-foreground mt-2">
            Please enter the score and date from your FAA Private Pilot Airplane (PAR) Knowledge Test
          </div>
        </form>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            type="button"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={!score || !date}
          >
            Save Test Results
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default KnowledgeTestResultsDialog;

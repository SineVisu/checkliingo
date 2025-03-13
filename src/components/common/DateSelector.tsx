import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface DateSelectorProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  date,
  onDateChange,
  placeholder = "Select date",
  className,
  isOpen,
  onOpenChange
}) => {
  // If isOpen and onOpenChange are provided, use them to control the popover
  // Otherwise, let the Popover component handle its own state
  const popoverProps = isOpen !== undefined && onOpenChange 
    ? { open: isOpen, onOpenChange } 
    : {};

  return (
    <Popover {...popoverProps}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          type="button"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
          className={cn("p-3 pointer-events-auto")}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateSelector;

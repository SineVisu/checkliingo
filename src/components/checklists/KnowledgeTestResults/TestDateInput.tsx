
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { KnowledgeTestFormValues } from './KnowledgeTestResultsForm';
import DateSelector from '@/components/common/DateSelector';
import { addMonths, isFuture, isAfter } from 'date-fns';

interface TestDateInputProps {
  form: UseFormReturn<KnowledgeTestFormValues>;
  calendarOpen: boolean;
  setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TestDateInput: React.FC<TestDateInputProps> = ({ 
  form, 
  calendarOpen, 
  setCalendarOpen 
}) => {
  // Function to disable dates: future dates and dates older than 24 months
  const disabledDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Calculate the date 24 months ago
    const twentyFourMonthsAgo = addMonths(today, -24);
    
    // Disable future dates
    if (isFuture(date)) return true;
    
    // Disable dates more than 24 months in the past
    if (isAfter(twentyFourMonthsAgo, date)) return true;
    
    return false;
  };

  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Test Date</FormLabel>
          <FormControl>
            <DateSelector
              date={field.value}
              onDateChange={(date) => {
                field.onChange(date);
                setCalendarOpen(false);
              }}
              placeholder="Select test date"
              isOpen={calendarOpen}
              onOpenChange={setCalendarOpen}
              disabledDates={disabledDates}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TestDateInput;
